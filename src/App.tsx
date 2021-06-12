import React, { useEffect, useState } from "react";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import { ConferenceMode } from "./types/App";
import { VoxeetConfig } from "./types/Voxeet";
import { initializeVoxeet } from "./core/voxeet/sdk";
import { Attendee, Room } from "./types/Conference";
import ConferenceContainer from "./layout/conference/ConferenceContainer";
import { VoxeetContext } from "./services/context/voxeetContext";
import Conference from "@voxeet/voxeet-web-sdk/types/models/Conference";

let Theme = createMuiTheme();
Theme = responsiveFontSizes(Theme);

interface Props {
  mode: ConferenceMode;
  voxeetConfig: VoxeetConfig;
  attendee: Attendee;
  room: Room;
}

export const App = ({ mode, voxeetConfig, attendee, room }: Props) => {
  const [conference, setConference] = useState(
    undefined as Conference | undefined
  );
  useEffect(() => {
    initializeVoxeet(voxeetConfig, attendee, room).then((conference) => {
      conference && setConference(conference);
    });
  }, [voxeetConfig, attendee, room]);

  return (
    <>
      {conference && (
        <ThemeProvider theme={Theme}>
          <VoxeetContext.Provider value={{ conference }}>
            <ConferenceContainer mode={mode} />
          </VoxeetContext.Provider>
        </ThemeProvider>
      )}
    </>
  );
};
