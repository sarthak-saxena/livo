import { useContext, useEffect } from "react";
import { VoxeetContext } from "../context/voxeetContext";
import { VoxeetContextType } from "../../types/context";
import { VoxeetCommandType, VoxeetConferenceEvents } from "../../types/Voxeet";
import VoxeetSdk from "@voxeet/voxeet-web-sdk";
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
import CallbackEventListener from "../../core/callbackEventListener";

const conference = VoxeetSdk.conference;
export const useVoxeet: () => VoxeetContextType = () => {
  return useContext(VoxeetContext);
};

export const voxeetHookCallback = new CallbackEventListener();

type StreamAddedCallback = (
  participant: Participant,
  stream: MediaStream,
  event: VoxeetConferenceEvents
) => void;

export const useVoxeetStreamAdded = (
  callback: StreamAddedCallback,
  onAttendeeAddCallback?: (
    participant: Participant,
    event: VoxeetConferenceEvents
  ) => void
) => {
  useEffect(() => {
    const streamAddListener = (
      participant: Participant,
      stream: MediaStream
    ) => {
      callback(participant, stream, VoxeetConferenceEvents.StreamAdded);
      onAttendeeAddCallback &&
        onAttendeeAddCallback(participant, VoxeetConferenceEvents.StreamAdded);
    };

    const streamRemoveListener = (
      participant: Participant,
      stream: MediaStream
    ) => {
      callback(participant, stream, VoxeetConferenceEvents.StreamRemoved);
      onAttendeeAddCallback &&
        onAttendeeAddCallback(
          participant,
          VoxeetConferenceEvents.StreamRemoved
        );
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
  }, [callback, onAttendeeAddCallback]);
};

export const useOnRequestSpeakerAccess = (callback: Function) => {
  useEffect(() => {
    voxeetHookCallback.on(
      VoxeetCommandType.RequestSpeakerAccess,
      (participant: Participant) => {
        callback(participant);
      }
    );
  }, [callback]);
};

export const useOnGrantSpeakerAccess = (callback: Function) => {
  useEffect(() => {
    voxeetHookCallback.on(
      VoxeetCommandType.GrantSpeakerAccess,
      (attendeeId: string) => {
        callback(attendeeId);
      }
    );
  }, [callback]);
};

export const useOnRevokeSpeakerAccess = (callback: Function) => {
  useEffect(() => {
    voxeetHookCallback.on(
      VoxeetCommandType.RevokeSpeakerAccess,
      (attendeeId: string) => {
        callback(attendeeId);
      }
    );
  }, [callback]);
};

export const useOnDenySpeakerAccess = (callback: Function) => {
  useEffect(() => {
    voxeetHookCallback.on(
      VoxeetCommandType.DenySpeakerAccess,
      (participant: Participant) => {
        callback(participant);
      }
    );
  }, [callback]);
};

export const useOnRaiseHand = (callback: Function) => {
  useEffect(() => {
    voxeetHookCallback.on(VoxeetCommandType.RaiseHand, (attendeeId: string) => {
      callback(attendeeId);
    });
  }, [callback]);
};

export const useOnUnRaiseHand = (callback: Function) => {
  useEffect(() => {
    voxeetHookCallback.on(
      VoxeetCommandType.unRaiseHand,
      (attendeeId: string) => {
        callback(attendeeId);
      }
    );
  }, [callback]);
};

export const useOnMuteAttendee = (callback: Function) => {
  useEffect(() => {
    voxeetHookCallback.on(
      VoxeetCommandType.MuteAttendee,
      (attendeeId: string) => {
        callback(attendeeId);
      }
    );
  }, [callback]);
};

export const useOnUnMuteAttendee = (callback: Function) => {
  useEffect(() => {
    voxeetHookCallback.on(
      VoxeetCommandType.UnMuteAttendee,
      (attendeeId: string) => {
        callback(attendeeId);
      }
    );
  }, [callback]);
};
