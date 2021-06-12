import Avatar from "@material-ui/core/Avatar";
import React, { useState } from "react";
import { Box, Grid, makeStyles, Paper, Theme } from "@material-ui/core";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";

const useStyles = makeStyles((theme: Theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  large: {
    width: theme.spacing(8.5),
    height: theme.spacing(8.5),
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

const UserAvatar = ({ attendee }: Props) => {
  const classes = useStyles();
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
