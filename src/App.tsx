import React, { useEffect, useState } from "react";
import { ConferenceMode } from "./types/App";
import {
  VoxeetAttendee,
  VoxeetConferenceEvents,
  SdkAPIConfig,
} from "./types/Voxeet";
import { initializeVoxeet } from "./core/voxeet/sdk";
import { Attendee, Room } from "./types/Conference";
import ConferenceContainer from "./layout/conference/ConferenceContainer";
import { VoxeetContext } from "./services/context/voxeetContext";
import Conference from "@voxeet/voxeet-web-sdk/types/models/Conference";
import { UserContext } from "./services/context/userContext";
import { ThemeProvider } from "theming";
import "./styles/index.sass";
import Box from "./components/ui/Box";

const theme = {
  color: "black",
  background: "white",
};

interface Props {
  mode: ConferenceMode;
  apiConfig: SdkAPIConfig;
  attendee: Attendee;
  room: Room;
  onAttendeeAdd?: (
    participant: VoxeetAttendee,
    event: VoxeetConferenceEvents
  ) => void;
  onAppInitializedSuccessCallback?: (conference: Conference) => void;
  onAppInitializedErrorCallback?: (e: Error) => void;
}

export const App = ({
  mode,
  apiConfig,
  attendee,
  room,
  onAttendeeAdd,
  onAppInitializedSuccessCallback,
  onAppInitializedErrorCallback,
}: Props) => {
  const [conference, setConference] = useState(
    undefined as Conference | undefined
  );

  useEffect(() => {
    initializeVoxeet(apiConfig, attendee, room)
      .then((conference) => {
        if (conference) {
          setConference(conference);
          onAppInitializedSuccessCallback &&
            onAppInitializedSuccessCallback(conference);
        }
      })
      .catch((error) => {
        onAppInitializedErrorCallback && onAppInitializedErrorCallback(error);
      });
  }, [
    apiConfig,
    attendee,
    room,
    onAppInitializedSuccessCallback,
    onAppInitializedErrorCallback,
  ]);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ attendee, onAttendeeAdd }}>
        {conference ? (
          <VoxeetContext.Provider value={{ conference }}>
            <Box className={"app-container"}>
              <ConferenceContainer mode={mode} />
            </Box>
          </VoxeetContext.Provider>
        ) : (
          <>Initializing Livo...</>
        )}
      </UserContext.Provider>
    </ThemeProvider>
  );
};
