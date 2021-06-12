import React from "react";
import Grid from "@material-ui/core/Grid";
import VideoStream from "../components/VideoStream";
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 20,
  },
}));

const VideoStreamContainer = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <VideoStream />
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <VideoStream />
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <VideoStream />
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <VideoStream />
      </Grid>
    </Grid>
  );
};

export default VideoStreamContainer;
