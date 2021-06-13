import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import UserAvatar from "../components/UserAvatar";
import { Box, makeStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useVoxeet, useVoxeetStreamAdded } from "../services/hooks/voxeetHook";
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
import { VoxeetConferenceEvents } from "../types/Voxeet";
import { useAttendee } from "../services/hooks/userHook";

const useStyles = makeStyles((theme: Theme) => ({
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

const UserAvatarContainer = () => {
  const classes = useStyles();
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
    <Box>
      <>
        <Typography>On Air</Typography>
        <Grid container spacing={2} className={classes.root}>
          <Grid item lg={2} md={2} sm={3} xs={3}>
            {/*<UserAvatar  />*/}
          </Grid>
        </Grid>
      </>
      <>
        <Typography>Members Connected: {attendees.length}</Typography>
        <Grid container spacing={2} className={classes.root}>
          {attendees.map((attendee) => (
            <Grid item lg={2} md={2} sm={3} xs={3} key={attendee.id}>
              <UserAvatar attendee={attendee} />
            </Grid>
          ))}
        </Grid>
      </>
    </Box>
  );
};

export default UserAvatarContainer;
