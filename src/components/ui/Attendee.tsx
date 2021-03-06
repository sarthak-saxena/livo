import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
import Column from "./Column";
import Row from "./Row";
import clsx from "clsx";
import Avatar, { AvatarSize } from "./Avatar";
import Typography from "./Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import React, { useState } from "react";
import {
  grantConferenceSpeakerAccess,
  invokeMuteAttendeeCommand,
  invokeUnMuteAttendeeCommand,
  revokeConferenceSpeakerAccess,
} from "../../core/voxeet/sdk";
import { createUseStyles } from "react-jss";
import {
  useOnGrantSpeakerAccess,
  useOnMuteAttendee,
  useOnUnMuteAttendee,
  voxeetHookCallback,
} from "../../services/hooks/voxeetHook";
import { VoxeetCommandType } from "../../types/Voxeet";
import { getShortHandName } from "../../core/Utilities";
import { useDataSync } from "../../services/hooks/dataSyncHook";
import { useMuteState } from "../../services/hooks/muteStateHook";

interface Props {
  attendee: Participant;
  isConferenceCreator: boolean;
  id: string;
}

const useStylesFromThemeFunction = createUseStyles((theme: any) => ({
  avatarWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  userWrapper: {
    alignItems: "center",
  },
  settingsWrapper: { display: "flex" },
}));

const useOnOnGrantSpeakerAccessCallback = (
  id: string,
  enableMakeSpeakerButton
) => {
  return React.useCallback(
    (attendeeId: string) => {
      if (attendeeId === id) {
        enableMakeSpeakerButton(false);
      }
    },
    [id, enableMakeSpeakerButton]
  );
};

const useOnMuteAttendeeCallback = (muteMike, participantId: string) => {
  return React.useCallback(
    (attendeeId: string) => {
      if (attendeeId === participantId) {
        muteMike(true);
      }
    },
    [muteMike, participantId]
  );
};

const useOnUnMuteAttendeeCallback = (muteMike, participantId: string) => {
  return React.useCallback(
    (attendeeId: string) => {
      if (attendeeId === participantId) {
        muteMike(false);
      }
    },
    [muteMike, participantId]
  );
};

const useDataFromDataSync = (attendee: Participant) => {
  const { getMuteState } = useMuteState();
  let enableMakeSpeakerButtonDefault = true,
    muteMikeDefault = getMuteState();

  const dataSync = useDataSync();
  const attendeeDataSync = dataSync[attendee.id];
  if (attendeeDataSync) {
    enableMakeSpeakerButtonDefault =
      attendeeDataSync.speaker === undefined
        ? enableMakeSpeakerButtonDefault
        : !attendeeDataSync.speaker;
    muteMikeDefault =
      attendeeDataSync.mute === undefined
        ? muteMikeDefault
        : attendeeDataSync.mute;
  }
  return { enableMakeSpeakerButtonDefault, muteMikeDefault };
};

export const Attendee = ({
  attendee,
  isConferenceCreator,
  id,
  ...props
}: Props) => {
  const grantAccess = () => {
    if (isMakeSpeakerButtonEnabled) {
      grantConferenceSpeakerAccess(attendee.id);
      enableMakeSpeakerButton(false);
      voxeetHookCallback.call(
        VoxeetCommandType.GrantSpeakerAccess,
        attendee.id
      );
    } else {
      revokeConferenceSpeakerAccess(attendee.id);
      enableMakeSpeakerButton(true);
      muteMike(true);
      voxeetHookCallback.call(
        VoxeetCommandType.RevokeSpeakerAccess,
        attendee.id
      );
      invokeMuteAttendeeCommand(attendee.id);
      voxeetHookCallback.call(VoxeetCommandType.MuteAttendee, attendee.id);
    }
  };

  const onMuteMike = () => {
    const mute = !isMikeMute;
    muteMike(mute);
    if (mute) {
      invokeMuteAttendeeCommand(attendee.id);
      voxeetHookCallback.call(VoxeetCommandType.MuteAttendee, attendee.id);
    } else {
      invokeUnMuteAttendeeCommand(attendee.id);
      voxeetHookCallback.call(VoxeetCommandType.UnMuteAttendee, attendee.id);
    }
  };

  const {
    enableMakeSpeakerButtonDefault,
    muteMikeDefault,
  } = useDataFromDataSync(attendee);

  const [isMakeSpeakerButtonEnabled, enableMakeSpeakerButton] = useState(
    enableMakeSpeakerButtonDefault
  );
  const [isMikeMute, muteMike] = useState(muteMikeDefault as boolean);
  const Icon = isMikeMute ? faMicrophoneSlash : faMicrophone;
  const classes = useStylesFromThemeFunction(props);
  const onOnGrantSpeakerAccessCallback = useOnOnGrantSpeakerAccessCallback(
    attendee.id,
    enableMakeSpeakerButton
  );
  const onMuteAttendeeCallback = useOnMuteAttendeeCallback(
    muteMike,
    attendee.id
  );
  const onUnMuteAttendeeCallback = useOnUnMuteAttendeeCallback(
    muteMike,
    attendee.id
  );

  useOnGrantSpeakerAccess(onOnGrantSpeakerAccessCallback);
  useOnMuteAttendee(onMuteAttendeeCallback);
  useOnUnMuteAttendee(onUnMuteAttendeeCallback);

  return (
    <Row key={attendee.id}>
      <Column className={"is-full"}>
        <Row className={classes.userWrapper}>
          <Column className={clsx("is-one-fifth", classes.avatarWrapper)}>
            <Avatar size={AvatarSize.Small}>
              {getShortHandName(attendee.info.name)}
            </Avatar>
          </Column>
          <Column>
            <Typography>{attendee.info.name}</Typography>
          </Column>
          {isConferenceCreator && id !== attendee.info?.externalId && (
            <Column className={classes.settingsWrapper}>
              <Button
                onClick={onMuteMike}
                disabled={isMakeSpeakerButtonEnabled}
              >
                <FontAwesomeIcon size={"sm"} icon={Icon} />
              </Button>
              <Button onClick={grantAccess}>
                <Typography>
                  {isMakeSpeakerButtonEnabled
                    ? "Make Speaker"
                    : "Remove Speaker"}
                </Typography>
              </Button>
            </Column>
          )}
        </Row>
      </Column>
    </Row>
  );
};
