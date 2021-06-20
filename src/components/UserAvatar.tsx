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

const UserAvatar = ({ attendee, ...props }: Props) => {
  const classes = useStylesFromThemeFunction(props);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMikeMute, muteMike] = useState(true);

  const Icon = isMikeMute ? faMicrophoneSlash : faMicrophone;
  return (
    <Box className={classes.container}>
      <Avatar>SS</Avatar>
      <FontAwesomeIcon icon={Icon} />
      <div>
        <Typography>{attendee.info.name}</Typography>
      </div>
    </Box>
  );
};

export default UserAvatar;
