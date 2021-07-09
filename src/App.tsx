import React from "react";
import { ConferenceMode } from "./types/App";
import {
  SdkAPIConfig,
  VoxeetAttendee,
  VoxeetConferenceEvents,
} from "./types/Voxeet";
import {
  getVoxeetSessionParticipants,
  initializeVoxeet,
  purgeVoxeetConference,
} from "./core/voxeet/sdk";
import { Attendee, Room } from "./types/Conference";
import ConferenceContainer from "./layout/conference/ConferenceContainer";
import { VoxeetContext } from "./services/context/voxeetContext";
import Conference from "@voxeet/voxeet-web-sdk/types/models/Conference";
import { UserContext } from "./services/context/userContext";
import { ThemeProvider } from "theming";
import "./styles/index.sass";
import Box from "./components/ui/Box";
import DataStore, { Data } from "./core/dataStore";
import { DataSyncContext } from "./services/context/dataSyncContext";

export const dataStore = new DataStore();

const theme = {
  color: "black",
  background: "white",
};

export const LivoAppContainer = "livo-app-container";

interface Props {
  apiConfig: SdkAPIConfig;
  attendee: Attendee;
  room: Room;
  onAttendeeAdd?: (
    participant: VoxeetAttendee,
    event: VoxeetConferenceEvents
  ) => void;
  onAppInitializedSuccessCallback?: (conference: Conference) => void;
  onAppInitializedErrorCallback?: (e: Error) => void;
  onCallDisconnectCallback?: Function;
  onPurgeComplete?: Function;
  mode?: ConferenceMode;
  disablePurgeOnRemount?: boolean;
}

interface State {
  conference: Conference | undefined;
  syncedData: Data | undefined;
}

const maxRetryCount = 3;
const retryInterval = 500; // 0.5 seconds

export class App extends React.Component<Props, State> {
  state = {
    conference: undefined,
    syncedData: undefined,
  };

  private retryCount = 0;

  private synchronizeData = () => {};

  private initConference() {
    const {
      apiConfig,
      attendee,
      room,
      onAppInitializedSuccessCallback,
      onAppInitializedErrorCallback,
    } = this.props;
    initializeVoxeet(apiConfig, attendee, room)
      .then((conference) => {
        if (conference) {
          this.setState({ conference }, () => {
            let participants = getVoxeetSessionParticipants();
            if (participants.length <= 1) {
              this.setState({ syncedData: {} });
            } else {
              dataStore
                .synchronise(conference)
                .then((syncedData) => {
                  this.setState({ syncedData });
                })
                .catch((error) => {
                  alert(error);
                });
            }
          });
          onAppInitializedSuccessCallback &&
            onAppInitializedSuccessCallback(conference);
        }
      })
      .catch((error) => {
        if (this.retryCount <= 3) {
          setTimeout(() => {
            this.initConference();
            this.retryCount++;
          }, retryInterval);
        } else {
          alert(error);
          onAppInitializedErrorCallback && onAppInitializedErrorCallback(error);
        }
      });
  }

  public async invokePurgeSession(): Promise<void> {
    await purgeVoxeetConference(this.props.onPurgeComplete);
  }

  componentWillMount() {
    this.initConference();
  }

  componentWillUnmount() {
    // Do not purge voxeet session if prop enabled
    if (!this.props.disablePurgeOnRemount) {
      this.invokePurgeSession();
    }
  }

  render() {
    const {
      attendee,
      onAttendeeAdd,
      onCallDisconnectCallback,
      mode,
    } = this.props;
    const { conference, syncedData } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <UserContext.Provider
          value={{ attendee, onAttendeeAdd, onCallDisconnectCallback, mode }}
        >
          {conference && syncedData ? (
            <VoxeetContext.Provider value={{ conference }}>
              <DataSyncContext.Provider value={syncedData}>
                <Box className={LivoAppContainer}>
                  <ConferenceContainer />
                </Box>
              </DataSyncContext.Provider>
            </VoxeetContext.Provider>
          ) : (
            <Box>{`${
              !conference
                ? "Initializing Livo"
                : !syncedData
                ? "Synchronising state"
                : ""
            }...`}</Box>
          )}
        </UserContext.Provider>
      </ThemeProvider>
    );
  }
}
