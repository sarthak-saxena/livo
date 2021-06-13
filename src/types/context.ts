import Conference from "@voxeet/voxeet-web-sdk/types/models/Conference";
import { VoxeetAttendee, VoxeetConferenceEvents } from "./Voxeet";
import { Attendee } from "./Conference";

export interface VoxeetContextType {
  conference?: Conference;
}

export interface UserContextType {
  attendee?: Attendee;
  onAttendeeAdd?: (
    participant: VoxeetAttendee,
    stream: MediaStream,
    event: VoxeetConferenceEvents
  ) => void;
}
