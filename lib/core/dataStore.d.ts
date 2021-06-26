import { VoxeetCommandType } from "../types/Voxeet";
interface Data {
    [attendeeId: string]: {
        speaker: boolean;
        handRaised: boolean;
        mute: boolean;
    };
}
export default class DataStore {
    private data;
    constructor();
    update(command: VoxeetCommandType, attendeeId: string): void;
    getData: () => Data;
}
export {};
