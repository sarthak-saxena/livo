import { ConferenceMode } from "./lib/types/App";
import { VoxeetConfig as VXConfig } from "./lib/types/Voxeet";
import { Attendee, Room } from "./lib/types/Conference";
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
import { VoxeetConferenceEvents } from "./src/types/Voxeet";
interface Props {
  mode: ConferenceMode;
  voxeetConfig: VXConfig;
  attendee: Attendee;
  room: Room;
  onAttendeeAdd?: (
    participant: Participant,
    stream: MediaStream,
    event: VoxeetConferenceEvents
  ) => void;
}

declare const Livo: ({
  mode,
  voxeetConfig,
  attendee,
  room,
}: Props) => JSX.Element;
