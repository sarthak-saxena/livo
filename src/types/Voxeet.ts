import { ParticipantInfo } from "@voxeet/voxeet-web-sdk/types/models/Options";

export interface VoxeetConfig {
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
