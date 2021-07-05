import React, { useEffect, useState } from "react";
import UserAvatar from "../components/UserAvatar";
import {
  useOnGrantSpeakerAccess,
  useOnMuteAttendee,
  useOnRaiseHand,
  useOnRevokeSpeakerAccess,
  useOnUnMuteAttendee,
  useOnUnRaiseHand,
  useVoxeet,
  useVoxeetStreamAdded,
} from "../services/hooks/voxeetHook";
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
import { VoxeetConferenceEvents } from "../types/Voxeet";
import { useAttendee } from "../services/hooks/userHook";
import { createUseStyles } from "react-jss";
import Box from "../components/ui/Box";
import Typography from "../components/ui/Typography";
import Column from "../components/ui/Column";
import Row from "../components/ui/Row";
import { isCreator } from "../core/Utilities";
import { useDataSync } from "../services/hooks/dataSyncHook";
import {
  useOnResizeMediaCallback,
  useResizeMediaObserver,
} from "../services/hooks/resizeMediaObserverHook";
import { getVoxeetSessionParticipants } from "../core/voxeet/sdk";
import VoxeetSdk from "@voxeet/voxeet-web-sdk";

const useStylesFromThemeFunction = createUseStyles((theme: any) => ({
  root: {
    padding: 20,
  },
  attendeesWrapperLg: {
    display: "block",
  },
  attendeesWrapperSm: {
    display: "none",
  },
  callInProgressWrapperSm: {
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  callInProgressWrapperLg: {
    display: "none",
  },
}));

export const useAttendeeAddCallback = (
  attendees: Participant[],
  setAttendees: (attendees: Participant[]) => void
) => {
  return React.useCallback(
    (
      participant: Participant,
      stream: MediaStream,
      eventType: VoxeetConferenceEvents
    ) => {
      setTimeout(() => {
        setAttendees(Object.assign([], getVoxeetSessionParticipants()));
      });
    },
    [attendees, setAttendees]
  );
};

const useOnGrantSpeakerAccessCallback = (speakers, setSpeakers) => {
  return React.useCallback(
    (attendeeId: string) => {
      speakers[attendeeId] = true;
      setSpeakers(Object.assign({}, speakers));
    },
    [speakers, setSpeakers]
  );
};

const useOnRevokeSpeakerAccessCallback = (speakers, setSpeakers) => {
  return React.useCallback(
    (attendeeId: string) => {
      speakers[attendeeId] = false;
      setSpeakers(Object.assign({}, speakers));
    },
    [speakers, setSpeakers]
  );
};

const useOnRaiseHandCallback = (setHandsRaised, handsRaised) => {
  return React.useCallback(
    (attendeeId: string) => {
      handsRaised[attendeeId] = true;
      setHandsRaised(Object.assign({}, handsRaised));
    },
    [setHandsRaised, handsRaised]
  );
};

const useOnUnRaiseHandCallback = (setHandsRaised, handsRaised) => {
  return React.useCallback(
    (attendeeId: string) => {
      handsRaised[attendeeId] = false;
      setHandsRaised(Object.assign({}, handsRaised));
    },
    [setHandsRaised, handsRaised]
  );
};

const useOnMuteAttendeeCallback = (micStatus, setMikeStatus) => {
  return React.useCallback(
    (attendeeId: string) => {
      micStatus[attendeeId] = true;
      setMikeStatus(Object.assign({}, micStatus));
    },
    [micStatus, setMikeStatus]
  );
};

const useOnUnMuteAttendeeCallback = (micStatus, setMikeStatus) => {
  return React.useCallback(
    (attendeeId: string) => {
      micStatus[attendeeId] = false;
      setMikeStatus(Object.assign({}, micStatus));
    },
    [micStatus, setMikeStatus]
  );
};

const useSyncFromDataSync = (): {
  syncedSpeakers: { [id: string]: boolean };
  syncedMicStatus: { [id: string]: boolean };
  syncedHandsRaised: { [id: string]: boolean };
} => {
  const dataSync = useDataSync();
  const syncedSpeakers = {};
  const syncedMicStatus = {};
  const syncedHandsRaised = {};
  for (let attendeeId in dataSync) {
    const attendee = dataSync[attendeeId];
    syncedSpeakers[attendeeId] = attendee.speaker;
    syncedMicStatus[attendeeId] = attendee.mute;
    syncedHandsRaised[attendeeId] = attendee.handRaised;
  }
  return { syncedSpeakers, syncedMicStatus, syncedHandsRaised };
};

const ConnectedUsers = ({ ...props }) => {
  const classes = useStylesFromThemeFunction(props);
  const { conference } = useVoxeet();
  const {
    syncedSpeakers,
    syncedMicStatus,
    syncedHandsRaised,
  } = useSyncFromDataSync();
  const [isSmallScreen, setSmallScreen] = useState(false);
  const [speakers, setSpeakers] = useState(
    syncedSpeakers as { [id: string]: boolean }
  );
  const [micStatus, setMikeStatus] = useState(
    syncedMicStatus as { [id: string]: boolean }
  );
  const [handsRaised, setHandsRaised] = useState(
    syncedHandsRaised as { [id: string]: boolean }
  );
  const { onAttendeeAdd, attendee } = useAttendee();
  const [attendees, setAttendees] = useState([] as Participant[]);
  const onAttendeeAddCallback = useAttendeeAddCallback(attendees, setAttendees);
  const onGrantSpeakerAccessCallback = useOnGrantSpeakerAccessCallback(
    speakers,
    setSpeakers
  );
  const onRevokeSpeakerAccessCallback = useOnRevokeSpeakerAccessCallback(
    speakers,
    setSpeakers
  );
  const onRaiseHandCallback = useOnRaiseHandCallback(setHandsRaised, attendee);
  const onUnRaiseHandCallback = useOnUnRaiseHandCallback(
    setHandsRaised,
    handsRaised
  );
  const onMuteAttendeeCallback = useOnMuteAttendeeCallback(
    micStatus,
    setMikeStatus
  );
  const onUnMuteAttendeeCallback = useOnUnMuteAttendeeCallback(
    micStatus,
    setMikeStatus
  );
  const onResizeMediaCallback = useOnResizeMediaCallback(setSmallScreen);

  useResizeMediaObserver(onResizeMediaCallback);
  useVoxeetStreamAdded(onAttendeeAddCallback, onAttendeeAdd);
  useOnGrantSpeakerAccess(onGrantSpeakerAccessCallback);
  useOnRevokeSpeakerAccess(onRevokeSpeakerAccessCallback);
  useOnRaiseHand(onRaiseHandCallback);
  useOnUnRaiseHand(onUnRaiseHandCallback);
  useOnMuteAttendee(onMuteAttendeeCallback);
  useOnUnMuteAttendee(onUnMuteAttendeeCallback);

  useEffect(() => {
    const sync = () => {
      const attendees = Array.from(
        conference ? conference.participants.values() : []
      ) as Participant[];
      setAttendees(attendees);
    };
    sync();
    // Todo Fix hack - add logic for resync
    setTimeout(sync, 1000);
  }, [conference]);
  return (
    <Box>
      <Column>{/*<UserAvatar  />*/}</Column>
      <Typography>Members Connected: {attendees.length}</Typography>
      <Box
        className={
          isSmallScreen
            ? classes.attendeesWrapperSm
            : classes.attendeesWrapperLg
        }
      >
        <Row>
          <Column>
            <Typography className={"is-size-4"}>Speakers:</Typography>
          </Column>
          <Row>
            {attendees.map((voxeetAttendee) => {
              if (speakers[voxeetAttendee.id] || isCreator(voxeetAttendee)) {
                return (
                  <Column className={"is-one-fifth"} key={voxeetAttendee.id}>
                    <UserAvatar
                      isHandRaised={handsRaised[voxeetAttendee.id]}
                      attendee={voxeetAttendee}
                      isMuted={micStatus[voxeetAttendee.id]}
                    />
                  </Column>
                );
              }
            })}
          </Row>
        </Row>
        <Row>
          <Column>
            <Typography className={"is-size-4"}>Members:</Typography>
          </Column>
          <Row>
            {attendees.map((voxeetAttendee) => {
              if (!speakers[voxeetAttendee.id] && !isCreator(voxeetAttendee)) {
                return (
                  <Column className={"is-one-fifth"} key={voxeetAttendee.id}>
                    <UserAvatar
                      isHandRaised={handsRaised[voxeetAttendee.id]}
                      attendee={voxeetAttendee}
                      isMuted={micStatus[voxeetAttendee.id]}
                    />
                  </Column>
                );
              }
            })}
          </Row>
        </Row>
      </Box>
      <Box
        className={
          isSmallScreen
            ? classes.callInProgressWrapperSm
            : classes.callInProgressWrapperLg
        }
      >
        Call {attendees.length > 0 ? "in progress" : "disconnected"}
      </Box>
    </Box>
  );
};

export default ConnectedUsers;
