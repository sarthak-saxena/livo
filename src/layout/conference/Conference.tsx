import React from "react";
import ConnectedUsers from "../ConnectedUsers";
import CallPad from "../../components/Callpad";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import Column from "../../components/ui/Column";
import { AttendeeList } from "../../components/AttendeeList";
import Row from "../../components/ui/Row";

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
  attendeeListWrapper: {
    position: "relative",
  },
}));

const Conference = ({ ...props }) => {
  const classes = useStylesFromThemeFunction(props);
  return (
    <>
      {/*<VideoStreamContainer/>*/}
      <Row className={clsx(classes.container)}>
        <Column
          className={clsx(
            "column",
            "is-two-thirds",
            classes.attendeeAndCallpadContainer
          )}
        >
          <ConnectedUsers />
          <CallPad />
        </Column>
        <Column className={classes.attendeeListWrapper}>
          <AttendeeList />
        </Column>
      </Row>
    </>
  );
};

export default Conference;
