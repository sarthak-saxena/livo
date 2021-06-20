import React, { useState } from "react";
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
import { createUseStyles } from "react-jss";
import Box from "./ui/Box";
import Avatar from "./ui/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import Typography from "./ui/Typography";
import { useOnRaiseHand, useOnUnRaiseHand } from "../services/hooks/voxeetHook";

const useStylesFromThemeFunction = createUseStyles((theme: any) => ({
  container: {
    margin: "0 1rem 0 1rem",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));

interface Props {
  attendee: Participant;
}

const useOnRaiseHandCallback = (setHandRaised, attendee) => {
  return React.useCallback(
    (attendeeId: string) => {
      attendee.id === attendeeId && setHandRaised(true);
    },
    [setHandRaised, attendee]
  );
};

const useOnUnRaiseHandCallback = (setHandRaised, attendee) => {
  return React.useCallback(
    (attendeeId: string) => {
      debugger;
      attendee.id === attendeeId && setHandRaised(false);
    },
    [setHandRaised, attendee]
  );
};

const UserAvatar = ({ attendee, ...props }: Props) => {
  const [isMikeMute, muteMike] = useState(true);
  const [isHandRaised, setHandRaised] = useState(false);
  const onRaiseHandCallback = useOnRaiseHandCallback(setHandRaised, attendee);
  const onUnRaiseHandCallback = useOnUnRaiseHandCallback(
    setHandRaised,
    attendee
  );
  useOnRaiseHand(onRaiseHandCallback);
  useOnUnRaiseHand(onUnRaiseHandCallback);
  const classes = useStylesFromThemeFunction(props);

  const Icon = isMikeMute ? faMicrophoneSlash : faMicrophone;
  return (
    <Box className={classes.container}>
      <Avatar>SS</Avatar>
      <FontAwesomeIcon icon={Icon} />
      <Box>
        <Typography>{attendee.info.name}</Typography>
      </Box>
      {isHandRaised && (
        <Box>
          <Typography>Hand raised</Typography>
        </Box>
      )}
    </Box>
  );
};

export default UserAvatar;
