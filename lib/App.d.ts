import React from "react";
import { ConferenceMode } from "./types/App";
import { VoxeetAttendee, VoxeetConferenceEvents, SdkAPIConfig } from "./types/Voxeet";
import { Attendee, Room } from "./types/Conference";
import Conference from "@voxeet/voxeet-web-sdk/types/models/Conference";
import "./styles/index.sass";
import DataStore, { Data } from "./core/dataStore";
export declare const dataStore: DataStore;
export declare const LivoAppContainer = "livo-app-container";
interface Props {
    mode: ConferenceMode;
    apiConfig: SdkAPIConfig;
    attendee: Attendee;
    room: Room;
    onAttendeeAdd?: (participant: VoxeetAttendee, event: VoxeetConferenceEvents) => void;
    onAppInitializedSuccessCallback?: (conference: Conference) => void;
    onAppInitializedErrorCallback?: (e: Error) => void;
    onCallDisconnectCallback?: Function;
    onPurgeComplete?: Function;
}
interface State {
    conference: Conference | undefined;
    syncedData: Data | undefined;
}
export declare class App extends React.Component<Props, State> {
    state: {
        conference: any;
        syncedData: any;
    };
    private retryCount;
    private initConference;
    componentWillMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
