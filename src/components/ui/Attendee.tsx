import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
import Column from "./Column";
import Row from "./Row";
import clsx from "clsx";
import Avatar, { AvatarSize } from "./Avatar";
import Typography from "./Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import React, { useState } from "react";
import { grantConferenceSpeakerAccess } from "../../core/voxeet/sdk";
import { createUseStyles } from "react-jss";
import { voxeetHookCallback } from "../../services/hooks/voxeetHook";
import { VoxeetCommandType } from "../../types/Voxeet";

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

export const Attendee = ({
  attendee,
  isConferenceCreator,
  id,
  ...props
}: Props) => {
  const grantAccess = () => {
    grantConferenceSpeakerAccess(attendee.id);
    enableMakeSpeakerButton(false);
    voxeetHookCallback.call(VoxeetCommandType.GrantSpeakerAccess, attendee.id);
  };

  const [isMakeSpeakerButtonEnabled, enableMakeSpeakerButton] = useState(true);

  const classes = useStylesFromThemeFunction(props);
  return (
    <Row key={attendee.id}>
      <Column className={"is-full"}>
        <Row className={classes.userWrapper}>
          <Column className={clsx("is-one-fifth", classes.avatarWrapper)}>
            <Avatar size={AvatarSize.Small}>SS</Avatar>
          </Column>
          <Column>
            <Typography>{attendee.info.name}</Typography>
          </Column>
          <Column>
            <FontAwesomeIcon size={"sm"} icon={faMicrophoneSlash} />
          </Column>
          {isConferenceCreator && id !== attendee.info?.externalId && (
            <Column>
              <Button
                disabled={!isMakeSpeakerButtonEnabled}
                onClick={grantAccess}
              >
                Make Speaker
              </Button>
            </Column>
          )}
        </Row>
      </Column>
    </Row>
  );
};
