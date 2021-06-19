import React, { useEffect, useState } from "react";
import UserAvatar from "../components/UserAvatar";
import { useVoxeet, useVoxeetStreamAdded } from "../services/hooks/voxeetHook";
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
import { VoxeetConferenceEvents } from "../types/Voxeet";
import { useAttendee } from "../services/hooks/userHook";
import { createUseStyles } from "react-jss";
import Box from "../components/ui/Box";
import Typography from "../components/ui/Typography";
import Column from "../components/ui/Column";
import Row from "../components/ui/Row";

const useStylesFromThemeFunction = createUseStyles((theme: any) => ({
  root: {
    padding: 20,
  },
}));

const useAttendeeAddCallback = (
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

const UserAvatarContainer = ({ ...props }) => {
  const classes = useStylesFromThemeFunction(props);
  const { conference } = useVoxeet();
  const { onAttendeeAdd } = useAttendee();
  const [attendees, setAttendees] = useState([] as Participant[]);
  const callback = useAttendeeAddCallback(attendees, setAttendees);
  useVoxeetStreamAdded(callback, onAttendeeAdd);

  useEffect(() => {
    const attendees = Array.from(
      conference ? conference.participants.values() : []
    ) as Participant[];
    setAttendees(attendees);
  }, [conference]);

  return (
    <Box className={""}>
      <>
        <Typography>On Air</Typography>
        <Column>{/*<UserAvatar  />*/}</Column>
      </>
      <>
        <Typography>Members Connected: {attendees.length}</Typography>
        <Row>
          <Column className={"is-desktop"}>
            {attendees.map((attendee) => (
              <UserAvatar attendee={attendee} />
            ))}
          </Column>
        </Row>
      </>
    </Box>
  );
};

export default UserAvatarContainer;
