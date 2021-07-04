import { ConferenceMode } from "./lib/types/App";
import { Attendee, Room } from "./lib/types/Conference";
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
import { SdkAPIConfig, VoxeetConferenceEvents } from "./src/types/Voxeet";
import Conference from "@voxeet/voxeet-web-sdk/types/models/Conference";
interface Props {
  mode: ConferenceMode;
  apiConfig: SdkAPIConfig;
  attendee: Attendee;
  room: Room;
  onAttendeeAdd?: (
    participant: Participant,
    stream: MediaStream,
    event: VoxeetConferenceEvents
  ) => void;
  onAppInitializedSuccessCallback?: (conference: Conference) => void;
  onAppInitializedErrorCallback?: (e: Error) => void;
  onCallDisconnectCallback?: Function;
  onPurgeComplete?: Function
}

declare const Livo: ({
  mode,
  apiConfig,
  attendee,
  room,
}: Props) => JSX.Element;
