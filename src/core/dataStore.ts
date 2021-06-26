import { VoxeetCommandType } from "../types/Voxeet";

interface Data {
  [attendeeId: string]: { speaker: boolean; handRaised: boolean };
}

export default class DataStore {
  private data: Data = {};

  constructor() {}

  update(command: VoxeetCommandType, attendeeId: string) {
    if (!this.data[attendeeId]) {
      this.data[attendeeId] = {} as { speaker: boolean; handRaised: boolean };
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
    }
  }

  getData = (): Data => {
    return this.data;
  };
}
