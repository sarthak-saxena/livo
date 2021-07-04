import { VoxeetCommandType } from "../types/Voxeet";
import Conference from "@voxeet/voxeet-web-sdk/types/models/Conference";
import { getVoxeetSessionParticipantId, requestDataSync } from "./voxeet/sdk";
import CallbackEventListener from "./callbackEventListener";

export interface Data {
  [attendeeId: string]: {
    speaker: boolean;
    handRaised: boolean;
    mute: boolean;
  };
}

export default class DataStore {
  private data: Data = {};
  dataSyncCallback = new CallbackEventListener();

  // constructor() {}

  update(command: VoxeetCommandType, attendeeId: string) {
    if (!this.data[attendeeId]) {
      this.data[attendeeId] = {} as {
        speaker: boolean;
        handRaised: boolean;
        mute: boolean;
      };
    }
    switch (command) {
      case VoxeetCommandType.GrantSpeakerAccess:
        this.data[attendeeId].speaker = true;
        break;
      case VoxeetCommandType.RevokeSpeakerAccess:
        this.data[attendeeId].speaker = false;
        break;
      case VoxeetCommandType.RaiseHand:
        this.data[attendeeId].handRaised = true;
        break;
      case VoxeetCommandType.unRaiseHand:
        this.data[attendeeId].handRaised = false;
        break;
      case VoxeetCommandType.MuteAttendee:
        this.data[attendeeId].mute = true;
        break;
      case VoxeetCommandType.UnMuteAttendee:
        this.data[attendeeId].mute = false;
        break;
    }
  }

  private setData(data: Data) {
    this.data = data;
  }

  getData = (): Data => {
    return this.data;
  };

  requestData = (): Promise<Data> => {
    const participantId = getVoxeetSessionParticipantId();
    requestDataSync(participantId);
    return new Promise((resolve) => {
      this.dataSyncCallback.on(
        VoxeetCommandType.ResponseDataSync,
        (data: Data) => {
          resolve(data);
        }
      );
    });
  };

  synchronise = async (conference: Conference): Promise<Data> => {
    if (conference.participants.size > 1) {
      try {
        const data = await this.requestData();
        this.setData(data);
      } catch (e) {
        console.error("Error in synchronising data");
        this.setData({});
      }
    } else {
      this.setData({});
    }
    return this.data;
  };
}
