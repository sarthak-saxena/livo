import React, { useCallback, useState } from "react";
import {
  getVoxeetSessionParticipantId,
  purgeVoxeetConference,
  raiseHandInConference,
  requestConferenceSpeakerAccess,
  toggleMuteAttendee,
  unRaiseHandInConference,
} from "../core/voxeet/sdk";
import Row from "./ui/Row";
import Box from "./ui/Box";
import {
  faHandPointUp,
  faMicrophone,
  faMicrophoneSlash,
  faPhone,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUseStyles } from "react-jss";
import { useAttendee } from "../services/hooks/userHook";
import Button from "./ui/Button";
import Column from "./ui/Column";
import clsx from "clsx";
import {
  useOnDenySpeakerAccess,
  useOnGrantSpeakerAccess,
  voxeetHookCallback,
} from "../services/hooks/voxeetHook";
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
import { VoxeetCommandType } from "../types/Voxeet";

const useStylesFromThemeFunction = createUseStyles((theme: any) => ({
  root: {
    borderTop: "1px solid gainsboro",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 20px 0 20px",
    width: "94%",
    margin: "0 !important",
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
    height: "1.5rem",
    width: "1.4rem !important",
  },
  handIcon: {
    width: "1.2rem !important",
  },
  configWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  requestButton: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  button: {
    width: "3.5rem",
    height: "3.5rem",
  },
}));

const useOnDenySpeakerAccessCallback = (enableRequestSpeakerAccessButton) => {
  return React.useCallback(
    (participant: Participant) => {
      debugger;
      enableRequestSpeakerAccessButton(true);
    },
    [enableRequestSpeakerAccessButton]
  );
};

const useOnGrantSpeakerAccessCallback = (muteMike, enableMike) => {
  return React.useCallback(
    (attendeeId: string) => {
      if (attendeeId === getVoxeetSessionParticipantId()) {
        toggleMuteAttendee();
        muteMike(false);
        enableMike(true);
      }
    },
    [muteMike, enableMike]
  );
};

const CallPad = ({ ...props }) => {
  const requestSpeakerAccess = () => {
    requestConferenceSpeakerAccess();
    enableRequestSpeakerAccessButton(false);
  };

  const raiseHand = () => {
    const value = !isHandRaised;
    const participantId = getVoxeetSessionParticipantId();
    if (value) {
      raiseHandInConference(participantId);
      voxeetHookCallback.call(VoxeetCommandType.RaiseHand, participantId);
    } else {
      unRaiseHandInConference(participantId);
      voxeetHookCallback.call(VoxeetCommandType.unRaiseHand, participantId);
    }

    setHandRaised(value);
  };

  const classes = useStylesFromThemeFunction(props);
  const { attendee } = useAttendee();
  const [isHandRaised, setHandRaised] = useState(false);
  const [isMikeMute, muteMike] = useState(true);
  const [isMikeEnabled, enableMike] = useState(attendee.isConferenceCreator);
  const [
    requestSpeakerAccessButtonEnabled,
    enableRequestSpeakerAccessButton,
  ] = useState(true);
  debugger;

  const muteMikeCallback = useCallback(() => {
    toggleMuteAttendee();
    muteMike(!isMikeMute);
  }, [isMikeMute]);

  const Icon = isMikeMute ? faMicrophoneSlash : faMicrophone;
  const onDenySpeakerAccessCallback = useOnDenySpeakerAccessCallback(
    enableRequestSpeakerAccessButton
  );
  useOnDenySpeakerAccess(onDenySpeakerAccessCallback);

  const onOnGrantSpeakerAccess = useOnGrantSpeakerAccessCallback(
    muteMike,
    enableMike
  );
  useOnGrantSpeakerAccess(onOnGrantSpeakerAccess);

  return (
    <Row className={classes.root}>
      <Column className={clsx("is-two-thirds", classes.configWrapper)}>
        <Box
          onClick={() => {
            purgeVoxeetConference();
          }}
          className={classes.iconWrapper}
        >
          <FontAwesomeIcon size={"lg"} icon={faPhone} />
        </Box>
        {/*<button>*/}
        <Box>
          <button
            onClick={muteMikeCallback}
            className={classes.iconWrapper}
            disabled={!attendee.isConferenceCreator || !isMikeEnabled}
          >
            <FontAwesomeIcon
              size={"lg"}
              icon={Icon}
              className={classes.micIcon}
            />
          </button>
        </Box>
        {/*</button>*/}
        <Box className={classes.iconWrapper}>
          <FontAwesomeIcon size={"lg"} icon={faSlidersH} />
        </Box>
        <Box>
          <button
            onClick={raiseHand}
            className={clsx(
              classes.iconWrapper,
              classes.button,
              "button",
              isHandRaised && "is-link"
            )}
          >
            <FontAwesomeIcon
              className={classes.handIcon}
              size={"lg"}
              icon={faHandPointUp}
            />
          </button>
        </Box>
      </Column>
      {!attendee.isConferenceCreator && (
        <Column className={classes.requestButton}>
          <Box>
            <Button
              disabled={!requestSpeakerAccessButtonEnabled}
              onClick={requestSpeakerAccess}
              className={"is-link"}
            >
              Request speaker access
            </Button>
          </Box>
        </Column>
      )}
    </Row>
  );
};

export default CallPad;
