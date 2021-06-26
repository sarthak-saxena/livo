/// <reference types="react" />
import { ConferenceMode } from "./types/App";
import { VoxeetAttendee, VoxeetConferenceEvents, SdkAPIConfig } from "./types/Voxeet";
import { Attendee, Room } from "./types/Conference";
import Conference from "@voxeet/voxeet-web-sdk/types/models/Conference";
import "./styles/index.sass";
interface Props {
    mode: ConferenceMode;
    apiConfig: SdkAPIConfig;
    attendee: Attendee;
    room: Room;
    onAttendeeAdd?: (participant: VoxeetAttendee, event: VoxeetConferenceEvents) => void;
    onAppInitializedSuccessCallback?: (conference: Conference) => void;
    onAppInitializedErrorCallback?: (e: Error) => void;
}
export declare const App: ({ mode, apiConfig, attendee, room, onAttendeeAdd, onAppInitializedSuccessCallback, onAppInitializedErrorCallback, }: Props) => JSX.Element;
export {};
