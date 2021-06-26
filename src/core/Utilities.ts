import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";

export const isCreator = (attendee: Participant) => {
  return attendee.info.name.includes("admin");
};

export const getShortHandName = (name: string): string => {
  const array = name.split(" ");
  return `${array[0][0]}${array[1] ? array[1][0] : ""}`;
};
