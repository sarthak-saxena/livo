export interface VoxeetConfig {
  consumerKey: string;
  consumerSecret: string;
}

export interface VoxeetAttendee {
  _eventsCount: number;
  audioQuality: number;
  audio: boolean;
  id: string;
  type: string;
  _events: {};
  info: { name: string; externalId: string; sdkVersion: string };
  status: string;
  streams: MediaStream[];
}

export enum VoxeetConferenceEvents {
  StreamAdded = "streamAdded",
  StreamRemoved = "streamRemoved",
}
