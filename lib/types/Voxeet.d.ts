import { ParticipantInfo } from "@voxeet/voxeet-web-sdk/types/models/Options";
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
export interface SdkAPIConfig {
    consumerKey: string;
    consumerSecret: string;
}
export interface VoxeetAttendee {
    audioQuality: number;
    audio: boolean;
    id: string;
    type: string;
    info: ParticipantInfo;
    status: string;
    streams: MediaStream[];
}
export declare enum VoxeetConferenceEvents {
    StreamAdded = "streamAdded",
    StreamRemoved = "streamRemoved"
}
interface VoxeetParticipantInfo extends ParticipantInfo {
    params?: {
        isCreator: boolean;
    };
}
export interface VoxeetParticipant extends Participant {
    info: VoxeetParticipantInfo;
}
export declare enum VoxeetCommandType {
    RequestSpeakerAccess = "RequestSpeakerAccess",
    GrantSpeakerAccess = "GrantSpeakerAccess",
    RevokeSpeakerAccess = "RevokeSpeakerAccess",
    MuteAttendee = "MuteAttendee",
    UnMuteAttendee = "UnMuteAttendee",
    DenySpeakerAccess = "DenySpeakerAccess",
    RaiseHand = "RaiseHand",
    unRaiseHand = "unRaiseHand",
    RequestDataSync = "RequestDataSync",
    ResponseDataSync = "ResponseDataSync"
}
export declare enum ParticipantStatus {
    Connected = "Connected",
    Left = "Left"
}
export {};
