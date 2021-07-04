import { VoxeetCommandType } from "../types/Voxeet";
export default class CallbackEventListener {
    listeners: {
        [name: string]: Function[];
    };
    private readonly updateDataStore;
    constructor(updateDataStore?: boolean);
    on: (eventListenerName: string, listener: Function) => void;
    call: (eventListenerName: VoxeetCommandType | string, params?: any) => void;
}
