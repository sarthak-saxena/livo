import VoxeetSdk from "@voxeet/voxeet-web-sdk";
import { SdkAPIConfig, VoxeetCommandType } from "../../types/Voxeet";
import { Attendee, Room } from "../../types/Conference";
import { JoinOptions } from "@voxeet/voxeet-web-sdk/types/models/Options";
import Conference from "@voxeet/voxeet-web-sdk/types/models/Conference";
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
import { voxeetHookCallback } from "../../services/hooks/voxeetHook";

const CommandingEventSeparator = "^_^";

export const initializeVoxeet = async (
  config: SdkAPIConfig,
  creator: Attendee,
  room: Room
): Promise<Conference | undefined> => {
  VoxeetSdk.initialize(config.consumerKey, config.consumerSecret);
  try {
    // close active voxeet session
    VoxeetSdk.session.participant && (await purgeVoxeetSession());
    await VoxeetSdk.session.open({
      name: `${creator.name} ${creator.isConferenceCreator ? "(admin)" : ""}`,
      externalId: creator.id,
    });
    const conference = await createConference(room);
    console.log("conference joined with participants", conference.participants);

    // add event listeners for commanding
    addEventlistenersForCommanding();

    // Important: disable mute initially for every attendee
    controlMuteState();
    return conference;
  } catch (e) {
    alert("Error in joining conference: " + e);
  }
};

const controlMuteState = () => {
  toggleMuteAttendee();
};

export const purgeVoxeetSession = async () => {
  await VoxeetSdk.session.close();
};

export const purgeVoxeetConference = async () => {
  await VoxeetSdk.conference.leave({ leaveRoom: true });
};

const getConferenceId = async (room: Room): Promise<string> => {
  return await VoxeetSdk.conference
    .create({
      alias: room.id,
      params: {
        dolbyVoice: true,
      },
    })
    .then((conference) => conference.id);
};

export const createConference = async (
  room: Room,
  joinInfo: JoinOptions = { constraints: { audio: true } }
): Promise<Conference> => {
  try {
    const conferenceId = await getConferenceId(room);
    return await joinConference(conferenceId, joinInfo);
  } catch (e) {
    throw new Error(e);
  }
};

export const joinConference = async (
  conferenceId: string,
  joinOptions: JoinOptions
): Promise<Conference> => {
  try {
    const conference = await VoxeetSdk.conference.fetch(conferenceId);
    console.log(
      "conference join link",
      `${window.location.origin}/?conferenceId=${conferenceId}`
    );
    return await VoxeetSdk.conference.join(conference, joinOptions);
  } catch (e) {
    throw new Error(e);
  }
};

export const toggleMuteAttendee = (participant?: Participant) => {
  VoxeetSdk.conference.mute(
    participant || VoxeetSdk.session.participant,
    !VoxeetSdk.conference.isMuted()
  );
};

export const muteAttendee = (participant: Participant, isMuted: boolean) => {
  VoxeetSdk.conference.mute(participant, isMuted);
};

export const requestConferenceSpeakerAccess = () => {
  VoxeetSdk.command.send(
    `${VoxeetCommandType.RequestSpeakerAccess}${CommandingEventSeparator}${VoxeetSdk.session.participant.id}`
  );
};

export const grantConferenceSpeakerAccess = (attendeeId: string) => {
  debugger;
  VoxeetSdk.command.send(
    `${VoxeetCommandType.GrantSpeakerAccess}${CommandingEventSeparator}${attendeeId}`
  );
};

export const denyConferenceSpeakerAccess = (attendeeId: string) => {
  VoxeetSdk.command.send(
    `${VoxeetCommandType.DenySpeakerAccess}${CommandingEventSeparator}${attendeeId}`
  );
};

export const removeConferenceSpeakerAccess = () => {};

export const addEventlistenersForCommanding = () => {
  const participant = VoxeetSdk.session.participant;
  VoxeetSdk.command.on("received", (participantWhoEmittedEvent, data) => {
    data = data.split(CommandingEventSeparator);
    const message = data[0];
    const attendeeId = data[1];
    switch (message) {
      case VoxeetCommandType.RequestSpeakerAccess:
        voxeetHookCallback.call(
          VoxeetCommandType.RequestSpeakerAccess,
          participantWhoEmittedEvent
        );
        break;
      case VoxeetCommandType.RemoveSpeaker:
        break;
      case VoxeetCommandType.GrantSpeakerAccess:
        if (attendeeId === participant.id) {
          voxeetHookCallback.call(
            VoxeetCommandType.GrantSpeakerAccess,
            participant
          );
        }
        break;
      case VoxeetCommandType.DenySpeakerAccess:
        if (attendeeId === participant.id) {
          voxeetHookCallback.call(
            VoxeetCommandType.DenySpeakerAccess,
            participant
          );
        }
        break;
      default:
        console.error("Unknown command type");
    }
  });
};
