import VoxeetSdk from "@voxeet/voxeet-web-sdk";
import { SdkAPIConfig, VoxeetCommandType } from "../../types/Voxeet";
import { Attendee, Room } from "../../types/Conference";
import { JoinOptions } from "@voxeet/voxeet-web-sdk/types/models/Options";
import Conference from "@voxeet/voxeet-web-sdk/types/models/Conference";
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
import { voxeetHookCallback } from "../../services/hooks/voxeetHook";
import { dataStore } from "../../App";
import { LocalStorageKeys } from "../../types/App";

const CommandingEventSeparator = "^_^";

export const initializeVoxeet = async (
  config: SdkAPIConfig,
  creator: Attendee,
  room: Room
): Promise<Conference | undefined> => {
  VoxeetSdk.initialize(config.consumerKey, config.consumerSecret);
  try {
    /**
     * if room id does not match
     * - disconnect from current conference
     * - start new conference
     */
    const currentConference = VoxeetSdk.conference.current;
    if (currentConference) {
      if (currentConference.alias !== room.id) {
        await purgeVoxeetConference();
      }
    }
    const participant = VoxeetSdk.session.participant;
    if (!participant) {
      await VoxeetSdk.session.open({
        name: `${creator.name} ${creator.isConferenceCreator ? "(admin)" : ""}`,
        externalId: creator.id,
      });
      const conference = await createConference(room);
      console.log(
        "conference joined with participants",
        conference.participants
      );

      // add event listeners for commanding
      addEventlistenersForCommanding();

      // Important: disable mute initially for every attendee
      controlMuteState(conference);
      return conference;
    } else {
      console.log("Reusing existing Voxeet context");
      return (VoxeetSdk.conference as unknown) as Conference;
    }
  } catch (e) {
    console.error("Error in joining conference: " + e);
    throw e;
  }
};

const controlMuteState = (conference: Conference) => {
  const muteState = localStorage.getItem(
    `${LocalStorageKeys.muteState}-${conference.id}`
  );
  const mute =
    muteState === "true" ? true : muteState === "false" ? false : true;
  if (mute) {
    invokeMuteAttendeeCommand(getVoxeetSessionParticipantId());
  } else {
    invokeUnMuteAttendeeCommand(getVoxeetSessionParticipantId());
  }
  toggleMuteAttendee(undefined, mute);
};

export const purgeVoxeetSession = async () => {
  VoxeetSdk.session.participant && (await VoxeetSdk.session.close());
};

export const purgeVoxeetConference = async (onDestroy?: Function) => {
  if (VoxeetSdk.conference) {
    console.log("purging voxeet conference");
    await VoxeetSdk.conference.leave({ leaveRoom: true });
    await purgeVoxeetSession();
    VoxeetSdk.command.off("received", commandListenerCallbacks);
    localStorage.removeItem(LocalStorageKeys.muteState);
    onDestroy && onDestroy();
  }
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
    return await VoxeetSdk.conference.join(conference, joinOptions);
  } catch (e) {
    throw new Error(e);
  }
};

export const toggleMuteAttendee = (
  participant?: Participant,
  muted?: boolean
) => {
  VoxeetSdk.conference.mute(
    participant || VoxeetSdk.session.participant,
    muted
  );
};

// export const isAttendeeMuted = (): boolean => VoxeetSdk.conference.isMuted();
//
// const muteAttendee = (participant: Participant, isMuted: boolean) => {
//   VoxeetSdk.conference.mute(participant, isMuted);
// };

export const requestConferenceSpeakerAccess = () => {
  VoxeetSdk.command.send(
    `${VoxeetCommandType.RequestSpeakerAccess}${CommandingEventSeparator}${VoxeetSdk.session.participant.id}`
  );
};

export const grantConferenceSpeakerAccess = (attendeeId: string) => {
  VoxeetSdk.command.send(
    `${VoxeetCommandType.GrantSpeakerAccess}${CommandingEventSeparator}${attendeeId}`
  );
};

export const revokeConferenceSpeakerAccess = (attendeeId: string) => {
  VoxeetSdk.command.send(
    `${VoxeetCommandType.RevokeSpeakerAccess}${CommandingEventSeparator}${attendeeId}`
  );
};

export const denyConferenceSpeakerAccess = (attendeeId: string) => {
  VoxeetSdk.command.send(
    `${VoxeetCommandType.DenySpeakerAccess}${CommandingEventSeparator}${attendeeId}`
  );
};

export const raiseHandInConference = (attendeeId: string) => {
  VoxeetSdk.command.send(
    `${VoxeetCommandType.RaiseHand}${CommandingEventSeparator}${attendeeId}`
  );
};

export const invokeMuteAttendeeCommand = (attendeeId: string) => {
  VoxeetSdk.command.send(
    `${VoxeetCommandType.MuteAttendee}${CommandingEventSeparator}${attendeeId}`
  );
};

export const invokeUnMuteAttendeeCommand = (attendeeId: string) => {
  VoxeetSdk.command.send(
    `${VoxeetCommandType.UnMuteAttendee}${CommandingEventSeparator}${attendeeId}`
  );
};

export const unRaiseHandInConference = (attendeeId: string) => {
  VoxeetSdk.command.send(
    `${VoxeetCommandType.unRaiseHand}${CommandingEventSeparator}${attendeeId}`
  );
};

export const requestDataSync = (attendeeId: string) => {
  VoxeetSdk.command.send(
    `${VoxeetCommandType.RequestDataSync}${CommandingEventSeparator}${attendeeId}`
  );
};

export const responseDataSync = (
  attendeeId: string,
  strngifiedResponse: string
) => {
  VoxeetSdk.command.send(
    `${VoxeetCommandType.ResponseDataSync}${CommandingEventSeparator}${attendeeId}${CommandingEventSeparator}${strngifiedResponse}`
  );
};

const commandListenerCallbacks = (participantWhoEmittedEvent, data) => {
  const participant = VoxeetSdk.session.participant;
  data = data.split(CommandingEventSeparator);
  const message = data[0];
  const attendeeId = data[1];
  const payload = data[2];
  switch (message) {
    case VoxeetCommandType.RequestSpeakerAccess:
      voxeetHookCallback.call(
        VoxeetCommandType.RequestSpeakerAccess,
        participantWhoEmittedEvent
      );
      break;
    case VoxeetCommandType.GrantSpeakerAccess:
      voxeetHookCallback.call(VoxeetCommandType.GrantSpeakerAccess, attendeeId);
      break;
    case VoxeetCommandType.RevokeSpeakerAccess:
      voxeetHookCallback.call(
        VoxeetCommandType.RevokeSpeakerAccess,
        attendeeId
      );
      break;
    case VoxeetCommandType.DenySpeakerAccess:
      if (attendeeId === participant.id) {
        voxeetHookCallback.call(
          VoxeetCommandType.DenySpeakerAccess,
          participant
        );
      }
      break;
    case VoxeetCommandType.RaiseHand:
      voxeetHookCallback.call(VoxeetCommandType.RaiseHand, attendeeId);
      break;
    case VoxeetCommandType.unRaiseHand:
      voxeetHookCallback.call(VoxeetCommandType.unRaiseHand, attendeeId);
      break;
    case VoxeetCommandType.MuteAttendee:
      voxeetHookCallback.call(VoxeetCommandType.MuteAttendee, attendeeId);
      break;
    case VoxeetCommandType.UnMuteAttendee:
      voxeetHookCallback.call(VoxeetCommandType.UnMuteAttendee, attendeeId);
      break;
    case VoxeetCommandType.RequestDataSync:
      responseDataSync(attendeeId, JSON.stringify(dataStore.getData()));
      break;
    case VoxeetCommandType.ResponseDataSync:
      if (attendeeId === participant.id && payload) {
        dataStore.dataSyncCallback.call(
          VoxeetCommandType.ResponseDataSync,
          JSON.parse(payload)
        );
      }
      break;
    default:
      console.error("Unknown command type");
  }
};

export const addEventlistenersForCommanding = () => {
  VoxeetSdk.command.on("received", commandListenerCallbacks);
};

export const getVoxeetSessionParticipantId = () => {
  return (
    VoxeetSdk.session &&
    VoxeetSdk.session.participant &&
    VoxeetSdk.session.participant.id
  );
};

export const getVoxeetSessionParticipants = (): Participant[] => {
  return (Array.from(
    VoxeetSdk.conference.participants.values()
  ) as Participant[]).filter((participant) => participant.status !== "Left");
};
