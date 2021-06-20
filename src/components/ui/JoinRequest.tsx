import React, { Dispatch, SetStateAction, useState } from "react";
import {
  useOnRequestSpeakerAccess,
  voxeetHookCallback,
} from "../../services/hooks/voxeetHook";
import { createUseStyles } from "react-jss";
import Box from "./Box";
import clsx from "clsx";
import Typography from "./Typography";
import Row from "./Row";
import Column from "./Column";
import Button from "./Button";
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
import {
  denyConferenceSpeakerAccess,
  grantConferenceSpeakerAccess,
} from "../../core/voxeet/sdk";
import { VoxeetCommandType } from "../../types/Voxeet";

const useStylesFromThemeFunction = createUseStyles((theme: any) => ({
  root: {
    width: "100%",
    marginBottom: "1rem !important",
  },
  permission: {
    padding: "0 1rem 1rem",
  },
  textSpeakerRequest: {
    marginTop: 0,
  },
}));

const useOnMakeSpeakerCallback = (
  setAttendees: Dispatch<SetStateAction<Participant[]>>,
  attendees: Participant[]
) => {
  return React.useCallback(
    (participant) => {
      attendees.push(participant);
      setAttendees(Object.assign([], attendees));
    },
    [attendees, setAttendees]
  );
};

const JoinRequest = ({ ...props }) => {
  const grantAccess = (attendee: Participant) => {
    grantConferenceSpeakerAccess(attendee.id);
    const index = attendees.findIndex((a) => a.id === attendee.id);
    attendees.splice(index, 1);
    setAttendees(Object.assign([], attendees));
    voxeetHookCallback.call(VoxeetCommandType.GrantSpeakerAccess, attendee.id);
  };

  const denyAccess = (attendee: Participant) => {
    denyConferenceSpeakerAccess(attendee.id);
    const index = attendees.findIndex((a) => a.id === attendee.id);
    attendees.splice(index, 1);
    setAttendees(Object.assign([], attendees));
  };

  const [attendees, setAttendees] = useState([] as Participant[]);
  const classes = useStylesFromThemeFunction(props);
  const onMakeSpeakerCallback = useOnMakeSpeakerCallback(
    setAttendees,
    attendees
  );
  useOnRequestSpeakerAccess(onMakeSpeakerCallback);
  return (
    <>
      {attendees.map((attendee, index) => (
        <article key={index} className={clsx("panel is-info", classes.root)}>
          <p className={clsx("panel-heading", classes.textSpeakerRequest)}>
            Speaker Requests
          </p>
          <Box className={classes.permission}>
            <Row>
              <Column>
                <Typography>
                  {attendee.info.name} is requesting access to speak
                </Typography>
              </Column>
            </Row>
            <Row>
              <Column>
                <Button
                  className={"is-success"}
                  onClick={grantAccess.bind(this, attendee)}
                >
                  Grant Access
                </Button>
              </Column>
              <Column>
                <Button
                  onClick={denyAccess.bind(this, attendee)}
                  className={"is-danger"}
                >
                  Deny
                </Button>
              </Column>
            </Row>
          </Box>
        </article>
      ))}
    </>
  );
};

export default JoinRequest;
