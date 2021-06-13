import React, { useEffect, useState } from "react";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import { ConferenceMode } from "./types/App";
import {
  VoxeetAttendee,
  VoxeetConferenceEvents,
  VoxeetConfig,
} from "./types/Voxeet";
import { initializeVoxeet } from "./core/voxeet/sdk";
import { Attendee, Room } from "./types/Conference";
import ConferenceContainer from "./layout/conference/ConferenceContainer";
import { VoxeetContext } from "./services/context/voxeetContext";
import Conference from "@voxeet/voxeet-web-sdk/types/models/Conference";
import { UserContext } from "./services/context/userContext";

let Theme = createMuiTheme();
Theme = responsiveFontSizes(Theme);

interface Props {
  mode: ConferenceMode;
  voxeetConfig: VoxeetConfig;
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
  voxeetConfig,
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
    initializeVoxeet(voxeetConfig, attendee, room)
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
  }, [voxeetConfig, attendee, room]);

  return (
    <ThemeProvider theme={Theme}>
      <UserContext.Provider value={{ attendee, onAttendeeAdd }}>
        {conference ? (
          <VoxeetContext.Provider value={{ conference }}>
            <ConferenceContainer mode={mode} />
          </VoxeetContext.Provider>
        ) : (
          <></>
        )}
      </UserContext.Provider>
    </ThemeProvider>
  );
};
