import React, { useState } from "react";
import ConnectedUsers from "../ConnectedUsers";
import CallPad from "../../components/Callpad";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import Column from "../../components/ui/Column";
import { AttendeeList } from "../../components/AttendeeList";
import Row from "../../components/ui/Row";
import {
  useOnResizeMediaCallback,
  useResizeMediaObserver,
} from "../../services/hooks/resizeMediaObserverHook";

const useStylesFromThemeFunction = createUseStyles((theme: any) => ({
  container: {
    height: "100%",
  },
  box: {
    width: "100%",
    height: "96%",
  },
  attendeeAndCallpadContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  attendeeListWrapperLg: {
    position: "relative",
  },
  attendeeListWrapperSm: {
    display: "none",
  },
}));

const Conference = ({ ...props }) => {
  const classes = useStylesFromThemeFunction(props);
  const [isSmallScreen, setSmallScreen] = useState(false);
  const onResizeMediaCallback = useOnResizeMediaCallback(setSmallScreen);
  useResizeMediaObserver(onResizeMediaCallback);

  return (
    <>
      {/*<VideoStreamContainer/>*/}
      <Row className={clsx(classes.container)}>
        <Column
          className={clsx(
            "column",
            !isSmallScreen && "is-two-thirds",
            classes.attendeeAndCallpadContainer
          )}
        >
          <ConnectedUsers />
          <CallPad />
        </Column>
        <Column
          className={
            isSmallScreen
              ? classes.attendeeListWrapperSm
              : classes.attendeeListWrapperLg
          }
        >
          <AttendeeList />
        </Column>
      </Row>
    </>
  );
};

export default Conference;
