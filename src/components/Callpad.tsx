import React, { useCallback, useState } from "react";
import { Box, Grid, makeStyles, Theme } from "@material-ui/core";
import CallEndIcon from "@material-ui/icons/CallEnd";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import SettingsIcon from "@material-ui/icons/Settings";
import { toggleMuteSelfAttendee, purgeVoxeet } from "../core/voxeet/sdk";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 20,
    position: "fixed",
    bottom: 0,
    borderTop: "1px solid gainsboro",
  },
  icon: {
    border: "1px solid gainsboro",
    borderRadius: "50%",
    padding: "1rem",
    "&:hover": {
      background: "gainsboro",
    },
  },
}));

const CallPad = () => {
  const classes = useStyles();
  const [isMikeMute, muteMike] = useState(false);
  const muteMikeCallback = useCallback(() => {
    toggleMuteSelfAttendee();
    muteMike(!isMikeMute);
  }, [isMikeMute]);
  const Icon = isMikeMute ? MicOffIcon : MicIcon;

  return (
    <>
      <Grid
        direction="row"
        alignItems="center"
        justify="center"
        spacing={1}
        container
        className={classes.root}
      >
        <Grid
          item
          onClick={() => {
            purgeVoxeet();
          }}
        >
          <CallEndIcon className={classes.icon} />
        </Grid>
        <Grid item>
          <Box onClick={muteMikeCallback}>
            <Icon className={classes.icon} />
          </Box>
        </Grid>
        <Grid item>
          <SettingsIcon className={classes.icon} />
        </Grid>
      </Grid>
    </>
  );
};

export default CallPad;
