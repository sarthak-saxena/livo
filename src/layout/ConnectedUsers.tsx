import React, { useEffect, useState } from "react";
import UserAvatar from "../components/UserAvatar";
import {
  useOnGrantSpeakerAccess,
  useOnRaiseHand,
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

const useStylesFromThemeFunction = createUseStyles((theme: any) => ({
  root: {
    padding: 20,
  },
  attendeeWrapper: {},
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
      const attendeesLength = attendees.length;
      const index = attendees.findIndex((a) => a.id === participant.id);
      if (eventType === VoxeetConferenceEvents.StreamAdded) {
        if (index === -1) {
          attendees.push(participant);
        }
      } else if (eventType === VoxeetConferenceEvents.StreamRemoved) {
        if (index !== -1) {
          attendees.splice(index, 1);
        }
      }
      if (attendeesLength !== attendees.length) {
        setAttendees(Object.assign([], attendees));
      }
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

const ConnectedUsers = ({ ...props }) => {
  const classes = useStylesFromThemeFunction(props);
  const { conference } = useVoxeet();
  const [speakers, setSpeakers] = useState({} as { [id: string]: boolean });
  const [handsRaised, setHandsRaised] = useState(
    {} as { [id: string]: boolean }
  );
  const { onAttendeeAdd, attendee } = useAttendee();
  const [attendees, setAttendees] = useState([] as Participant[]);
  const onAttendeeAddCallback = useAttendeeAddCallback(attendees, setAttendees);
  const onOnGrantSpeakerAccess = useOnGrantSpeakerAccessCallback(
    speakers,
    setSpeakers
  );
  const onRaiseHandCallback = useOnRaiseHandCallback(setHandsRaised, attendee);
  const onUnRaiseHandCallback = useOnUnRaiseHandCallback(
    setHandsRaised,
    handsRaised
  );

  useVoxeetStreamAdded(onAttendeeAddCallback, onAttendeeAdd);
  useOnGrantSpeakerAccess(onOnGrantSpeakerAccess);
  useOnRaiseHand(onRaiseHandCallback);
  useOnUnRaiseHand(onUnRaiseHandCallback);

  useEffect(() => {
    const attendees = Array.from(
      conference ? conference.participants.values() : []
    ) as Participant[];
    setAttendees(attendees);
  }, [conference]);

  return (
    <Box>
      <Column>{/*<UserAvatar  />*/}</Column>
      <Typography>Members Connected: {attendees.length}</Typography>
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
                  />
                </Column>
              );
            }
          })}
        </Row>
      </Row>
    </Box>
  );
};

export default ConnectedUsers;
