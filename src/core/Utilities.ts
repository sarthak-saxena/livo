import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";

export const isCreator = (attendee: Participant) => {
  return attendee.info.name.includes("admin");
};
