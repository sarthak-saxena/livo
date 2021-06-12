/// <reference types="react" />
import { ConferenceMode } from "./types/App";
import { VoxeetConfig } from "./types/Voxeet";
import { Attendee, Room } from "./types/Conference";
interface Props {
    mode: ConferenceMode;
    voxeetConfig: VoxeetConfig;
    attendee: Attendee;
    room: Room;
}
export declare const App: ({ mode, voxeetConfig, attendee, room }: Props) => JSX.Element;
export {};
