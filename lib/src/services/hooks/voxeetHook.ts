import { useContext, useEffect } from "react";
import { VoxeetContext } from "../context/voxeetContext";
import { VoxeetContextType } from "../../types/context";
import { VoxeetConferenceEvents } from "../../types/Voxeet";
import VoxeetSdk from "@voxeet/voxeet-web-sdk";
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
const conference = VoxeetSdk.conference;
export const useVoxeet: () => VoxeetContextType = () => {
  return useContext(VoxeetContext);
};

export const useVoxeetStreamAdded = (callback: any) => {
  useEffect(() => {
    const streamAddListener = (
      participant: Participant,
      stream: MediaStream
    ) => {
      callback(participant, stream, VoxeetConferenceEvents.StreamAdded);
    };

    const streamRemoveListener = (
      participant: Participant,
      stream: MediaStream
    ) => {
      callback(participant, stream, VoxeetConferenceEvents.StreamRemoved);
    };

    conference.on(VoxeetConferenceEvents.StreamAdded, streamAddListener);
    conference.on(VoxeetConferenceEvents.StreamRemoved, streamRemoveListener);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      conference.off(VoxeetConferenceEvents.StreamAdded, streamAddListener);
      conference.off(
        VoxeetConferenceEvents.StreamRemoved,
        streamRemoveListener
      );
    };
  }, [callback]);
};
