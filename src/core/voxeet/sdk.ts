import VoxeetSdk from "@voxeet/voxeet-web-sdk";
import { SdkAPIConfig } from "../../types/Voxeet";
import { Attendee, Room } from "../../types/Conference";
import { JoinOptions } from "@voxeet/voxeet-web-sdk/types/models/Options";
import Conference from "@voxeet/voxeet-web-sdk/types/models/Conference";
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";

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
      name: creator.name,
      externalId: creator.id,
    });
    const conference = await createConference(room);
    console.log("conference joined with participants", conference.participants);
    return conference;
  } catch (e) {
    alert("Error in joining conference: " + e);
  }
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

export const toggleMuteSelfAttendee = () => {
  VoxeetSdk.conference.mute(
    VoxeetSdk.session.participant,
    !VoxeetSdk.conference.isMuted()
  );
};

export const muteAttendee = (participant: Participant, isMuted: boolean) => {
  VoxeetSdk.conference.mute(participant, isMuted);
};
