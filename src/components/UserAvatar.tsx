import Avatar from "@material-ui/core/Avatar";
import React, { useState } from "react";
import { Box, Grid, Paper } from "@material-ui/core";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
import { createUseStyles } from "react-jss";

const useStylesFromThemeFunction = createUseStyles((theme: any) => ({
  orange: {
    color: "orange",
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: "purple",
    backgroundColor: deepPurple[500],
  },
  large: {
    width: 8.5,
    height: 8.5,
  },
  iconWrapper: {
    marginTop: "-1rem",
    zIndex: 1,
  },
  paper: {
    borderRadius: "37%",
  },
}));

interface Props {
  attendee: Participant;
}

const UserAvatar = ({ attendee, ...props }: Props) => {
  const classes = useStylesFromThemeFunction(props);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMikeMute, muteMike] = useState(true);

  const Icon = isMikeMute ? MicOffIcon : MicIcon;
  return (
    <Grid
      direction="column"
      alignItems="center"
      justify="center"
      spacing={1}
      container
    >
      <Avatar className={clsx(classes.orange, classes.large)}>SS</Avatar>
      <Box className={classes.iconWrapper}>
        <Paper className={classes.paper}>
          <Icon fontSize={"small"} />
        </Paper>
      </Box>
      <Typography>{attendee.info.name}</Typography>
    </Grid>
  );
};

export default UserAvatar;
