import React from "react";
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
import { getShortHandName } from "../core/Utilities";

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
  isHandRaised: boolean;
  isMuted?: boolean;
}

const UserAvatar = ({ attendee, isHandRaised, isMuted, ...props }: Props) => {
  const classes = useStylesFromThemeFunction(props);
  const isMikeMute = isMuted === undefined ? true : isMuted;
  const Icon = isMikeMute ? faMicrophoneSlash : faMicrophone;

  return (
    <Box className={classes.container}>
      <Avatar>{getShortHandName(attendee.info.name)}</Avatar>
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
