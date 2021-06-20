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

export enum VoxeetConferenceEvents {
  StreamAdded = "streamAdded",
  StreamRemoved = "streamRemoved",
}

interface VoxeetParticipantInfo extends ParticipantInfo {
  params?: {
    isCreator: boolean;
  };
}

export interface VoxeetParticipant extends Participant {
  info: VoxeetParticipantInfo;
}

export enum VoxeetCommandType {
  RequestSpeakerAccess = "RequestSpeakerAccess",
  RemoveSpeaker = "RemoveSpeaker",
  GrantSpeakerAccess = "GrantSpeakerAccess",
  DenySpeakerAccess = "DenySpeakerAccess",
  RaiseHand = "RaiseHand",
  unRaiseHand = "unRaiseHand",
}
