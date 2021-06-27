import Conference from "@voxeet/voxeet-web-sdk/types/models/Conference";
import { VoxeetAttendee, VoxeetConferenceEvents } from "./Voxeet";
import { Attendee } from "./Conference";
import { Data } from "../core/dataStore";
export interface VoxeetContextType {
    conference?: Conference;
}
export interface UserContextType {
    attendee?: Attendee;
    onAttendeeAdd?: (participant: VoxeetAttendee, event: VoxeetConferenceEvents) => void;
}
export interface DataSyncContextType extends Data {
}
