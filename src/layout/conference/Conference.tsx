import React, { useEffect } from "react";
import ConnectedUsers from "../AvatarContainer";
import CallPad from "../../components/Callpad";

const Conference = () => {
  return (
    <>
      {/*<VideoStreamContainer/>*/}
      <ConnectedUsers />
      <CallPad />
    </>
  );
};

export default Conference;
