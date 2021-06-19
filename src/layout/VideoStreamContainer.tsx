import React from "react";
import VideoStream from "../components/VideoStream";
import Column from "../components/ui/Column";
import { createUseStyles } from "react-jss";

const useStylesFromThemeFunction = createUseStyles((theme: any) => ({
  root: {
    padding: 20,
  },
}));

const VideoStreamContainer = ({ ...props }) => {
  const classes = useStylesFromThemeFunction(props);
  return (
    <Column>
      <VideoStream />
      <VideoStream />
      <VideoStream />
      <VideoStream />
    </Column>
  );
};

export default VideoStreamContainer;
