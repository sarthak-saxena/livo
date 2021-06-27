import React, { useCallback, useState } from "react";
import {
  getVoxeetSessionParticipantId,
  invokeMuteAttendeeCommand,
  purgeVoxeetConference,
  raiseHandInConference,
  requestConferenceSpeakerAccess,
  toggleMuteAttendee,
  invokeUnMuteAttendeeCommand,
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
  useOnMuteAttendee,
  useOnRevokeSpeakerAccess,
  useOnUnMuteAttendee,
  voxeetHookCallback,
} from "../services/hooks/voxeetHook";
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
import { VoxeetCommandType } from "../types/Voxeet";
import { useDataSync } from "../services/hooks/dataSyncHook";

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
      enableRequestSpeakerAccessButton(true);
    },
    [enableRequestSpeakerAccessButton]
  );
};

const useOnGrantSpeakerAccessCallback = (
  muteMike,
  enableMike,
  enableRequestSpeakerAccessButton
) => {
  return React.useCallback(
    (attendeeId: string) => {
      if (attendeeId === getVoxeetSessionParticipantId()) {
        // Todo discuss & add if mike needs to be enabled by default once the member becomes speaker
        // toggleMuteAttendee();
        // muteMike(false);

        enableMike(true);
        enableRequestSpeakerAccessButton(false);
      }
    },
    [muteMike, enableMike, enableRequestSpeakerAccessButton]
  );
};

const useOnRevokeSpeakerAccessCallback = (
  muteMike,
  enableMike,
  enableRequestSpeakerAccessButton
) => {
  return React.useCallback(
    (attendeeId: string) => {
      if (attendeeId === getVoxeetSessionParticipantId()) {
        toggleMuteAttendee(undefined, true);
        muteMike(true);
        enableMike(false);
        enableRequestSpeakerAccessButton(true);
      }
    },
    [muteMike, enableMike, enableRequestSpeakerAccessButton]
  );
};

const useOnMuteAttendeeCallback = (muteMike) => {
  const participantId = getVoxeetSessionParticipantId();
  return React.useCallback(
    (attendeeId: string) => {
      if (attendeeId === participantId) {
        const mute = true;
        muteMike(mute);
        toggleMuteAttendee(undefined, mute);
      }
    },
    [muteMike]
  );
};

const useOnUnMuteAttendeeCallback = (muteMike) => {
  const participantId = getVoxeetSessionParticipantId();
  return React.useCallback(
    (attendeeId: string) => {
      if (attendeeId === participantId) {
        const mute = false;
        muteMike(mute);
        toggleMuteAttendee(undefined, mute);
      }
    },
    [muteMike]
  );
};

const useDataFromDataSync = (participantId: string) => {
  const { attendee } = useAttendee();
  const dataSync = useDataSync();
  let setHandRaisedDefault = false,
    muteMikeDefault = true,
    enableMikeDefault = attendee.isConferenceCreator,
    requestSpeakerAccessButtonEnabledDefault = true;
  if (dataSync[participantId]) {
    const state = dataSync[participantId];
    setHandRaisedDefault = state.handRaised || setHandRaisedDefault;
    muteMikeDefault = state.mute || muteMikeDefault;
    enableMikeDefault = state.speaker || enableMikeDefault;
    requestSpeakerAccessButtonEnabledDefault =
      state.speaker === undefined
        ? requestSpeakerAccessButtonEnabledDefault
        : !state.speaker;
  }
  return {
    setHandRaisedDefault,
    muteMikeDefault,
    enableMikeDefault,
    requestSpeakerAccessButtonEnabledDefault,
  };
};

const CallPad = ({ ...props }) => {
  const requestSpeakerAccess = () => {
    requestConferenceSpeakerAccess();
    enableRequestSpeakerAccessButton(false);
  };
  const participantId = getVoxeetSessionParticipantId();

  const raiseHand = () => {
    const value = !isHandRaised;

    if (value) {
      raiseHandInConference(participantId);
      voxeetHookCallback.call(VoxeetCommandType.RaiseHand, participantId);
    } else {
      unRaiseHandInConference(participantId);
      voxeetHookCallback.call(VoxeetCommandType.unRaiseHand, participantId);
    }

    setHandRaised(value);
  };

  const { attendee } = useAttendee();
  const {
    setHandRaisedDefault,
    muteMikeDefault,
    enableMikeDefault,
    requestSpeakerAccessButtonEnabledDefault,
  } = useDataFromDataSync(participantId);
  const classes = useStylesFromThemeFunction(props);
  const [isHandRaised, setHandRaised] = useState(setHandRaisedDefault);
  const [isMikeMute, muteMike] = useState(muteMikeDefault);
  const [isMikeEnabled, enableMike] = useState(enableMikeDefault);
  const [
    requestSpeakerAccessButtonEnabled,
    enableRequestSpeakerAccessButton,
  ] = useState(requestSpeakerAccessButtonEnabledDefault);

  const muteMikeCallback = useCallback(() => {
    const mute = !isMikeMute;
    if (mute) {
      invokeMuteAttendeeCommand(participantId);
      voxeetHookCallback.call(VoxeetCommandType.MuteAttendee, participantId);
    } else {
      invokeUnMuteAttendeeCommand(participantId);
      voxeetHookCallback.call(VoxeetCommandType.UnMuteAttendee, participantId);
    }
  }, [isMikeMute]);

  const Icon = isMikeMute ? faMicrophoneSlash : faMicrophone;
  const onDenySpeakerAccessCallback = useOnDenySpeakerAccessCallback(
    enableRequestSpeakerAccessButton
  );
  const onGrantSpeakerAccess = useOnGrantSpeakerAccessCallback(
    muteMike,
    enableMike,
    enableRequestSpeakerAccessButton
  );
  const onRevokeSpeakerAccess = useOnRevokeSpeakerAccessCallback(
    muteMike,
    enableMike,
    enableRequestSpeakerAccessButton
  );
  const onMuteAttendeeCallback = useOnMuteAttendeeCallback(muteMike);
  const onUnMuteAttendeeCallback = useOnUnMuteAttendeeCallback(muteMike);

  useOnDenySpeakerAccess(onDenySpeakerAccessCallback);
  useOnGrantSpeakerAccess(onGrantSpeakerAccess);
  useOnRevokeSpeakerAccess(onRevokeSpeakerAccess);
  useOnMuteAttendee(onMuteAttendeeCallback);
  useOnUnMuteAttendee(onUnMuteAttendeeCallback);

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
        <Box>
          <button
            onClick={muteMikeCallback}
            className={clsx(classes.iconWrapper, classes.button, "button")}
            disabled={attendee.isConferenceCreator ? false : !isMikeEnabled}
          >
            <FontAwesomeIcon
              size={"lg"}
              icon={Icon}
              className={classes.micIcon}
            />
          </button>
        </Box>
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
