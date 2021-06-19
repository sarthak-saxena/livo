import React, { useCallback, useState } from "react";
import {
  purgeVoxeetConference,
  toggleMuteSelfAttendee,
} from "../core/voxeet/sdk";
import Row from "./ui/Row";
import Box from "./ui/Box";
import {
  faMicrophone,
  faMicrophoneSlash,
  faPhone,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUseStyles } from "react-jss";

const useStylesFromThemeFunction = createUseStyles((theme: any) => ({
  root: {
    position: "fixed",
    bottom: 0,
    borderTop: "1px solid gainsboro",
    width: "92%",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 20px 0 20px",
  },
  iconWrapper: {
    border: "1px solid gainsboro",
    borderRadius: "50%",
    padding: "1rem",
    "&:hover": {
      background: "gainsboro",
    },
    margin: "0 1rem 0 1rem",
  },
  micIcon: {
    width: "1.2rem !important",
  },
}));

const CallPad = ({ ...props }) => {
  const classes = useStylesFromThemeFunction(props);
  const [isMikeMute, muteMike] = useState(false);
  const muteMikeCallback = useCallback(() => {
    toggleMuteSelfAttendee();
    muteMike(!isMikeMute);
  }, [isMikeMute]);
  const Icon = isMikeMute ? faMicrophoneSlash : faMicrophone;

  return (
    <>
      <Row className={classes.root}>
        <Box
          onClick={() => {
            purgeVoxeetConference();
          }}
          className={classes.iconWrapper}
        >
          <FontAwesomeIcon size={"lg"} icon={faPhone} />
        </Box>
        <Box onClick={muteMikeCallback} className={classes.iconWrapper}>
          <FontAwesomeIcon
            size={"lg"}
            icon={Icon}
            className={classes.micIcon}
          />
        </Box>
        <Box className={classes.iconWrapper}>
          <FontAwesomeIcon size={"lg"} icon={faSlidersH} />
        </Box>
      </Row>
    </>
  );
};

export default CallPad;
