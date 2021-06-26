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
  revokeConferenceSpeakerAccess,
} from "../../core/voxeet/sdk";
import { createUseStyles } from "react-jss";
import {
  useOnGrantSpeakerAccess,
  voxeetHookCallback,
} from "../../services/hooks/voxeetHook";
import { VoxeetCommandType } from "../../types/Voxeet";
import { getShortHandName } from "../../core/Utilities";

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
      voxeetHookCallback.call(
        VoxeetCommandType.RevokeSpeakerAccess,
        attendee.id
      );
    }
  };

  const [isMakeSpeakerButtonEnabled, enableMakeSpeakerButton] = useState(true);
  const [isMikeMute, muteMike] = useState(true);
  const Icon = isMikeMute ? faMicrophoneSlash : faMicrophone;
  const classes = useStylesFromThemeFunction(props);
  const onOnGrantSpeakerAccessCallback = useOnOnGrantSpeakerAccessCallback(
    attendee.id,
    enableMakeSpeakerButton
  );
  useOnGrantSpeakerAccess(onOnGrantSpeakerAccessCallback);

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
          <Column>
            <Button disabled={!isConferenceCreator}>
              <FontAwesomeIcon size={"sm"} icon={Icon} />
            </Button>
          </Column>
          {isConferenceCreator && id !== attendee.info?.externalId && (
            <Column>
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
