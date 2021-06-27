import { VoxeetCommandType } from "../types/Voxeet";
import Conference from "@voxeet/voxeet-web-sdk/types/models/Conference";
import CallbackEventListener from "./callbackEventListener";
export interface Data {
    [attendeeId: string]: {
        speaker: boolean;
        handRaised: boolean;
        mute: boolean;
    };
}
export default class DataStore {
    private data;
    dataSyncCallback: CallbackEventListener;
    constructor();
    update(command: VoxeetCommandType, attendeeId: string): void;
    private setData;
    getData: () => Data;
    requestData: () => Promise<Data>;
    synchronise: (conference: Conference) => Promise<Data>;
}
