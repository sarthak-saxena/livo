import React, { useEffect, useState } from "react";
import Box from "./ui/Box";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { useVoxeet, useVoxeetStreamAdded } from "../services/hooks/voxeetHook";
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
import Row from "./ui/Row";
import Typography from "./ui/Typography";
import { useAttendee } from "../services/hooks/userHook";
import { useAttendeeAddCallback } from "../layout/ConnectedUsers";
import JoinRequest from "./ui/JoinRequest";
import { Attendee } from "./ui/Attendee";
import RaisehandRequest from "./RaisehandRequest";

const useStylesFromThemeFunction = createUseStyles((theme: any) => ({
  container: {
    width: "100%",
    height: "96%",
    position: "absolute",
    top: 0,
    right: "-4%",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  avatarWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  userWrapper: {
    alignItems: "center",
  },
}));

export const AttendeeList = ({ ...props }) => {
  const classes = useStylesFromThemeFunction(props);
  const { conference } = useVoxeet();
  const [attendees, setAttendees] = useState([] as Participant[]);
  const callback = useAttendeeAddCallback(attendees, setAttendees);
  const { attendee } = useAttendee();
  useVoxeetStreamAdded(callback);

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
  }, []);

  return (
    <Box className={clsx("box", classes.container)}>
      <Row>
        <RaisehandRequest />
      </Row>
      {attendee.isConferenceCreator && (
        <Row>
          <JoinRequest />
        </Row>
      )}

      <Row>
        <Typography className={"is-size-4"}>Attendees</Typography>
        {attendees.map((voxeetAttendee, index) => (
          <Attendee
            key={index}
            attendee={voxeetAttendee}
            isConferenceCreator={attendee.isConferenceCreator}
            id={attendee.id}
          />
        ))}
      </Row>
    </Box>
  );
};
