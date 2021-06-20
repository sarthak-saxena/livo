import { Attendee, Room } from "../types/Conference";
const randomId = Math.floor(Math.random() * 1000).toString();

export const SampleRoom: Room = {
  name: "Sample Channel",
  id: "57a26845-a7c8-4dee-9041-efd39d81139f",
};

export const SampleUsers: Attendee[] = [
  {
    name: "Harish",
    id: "c83ef97b-6f2e-4946-b79a-163f5fec7e9d",
  },
  {
    name: "Soni",
    id: "c83ef97b-6f2e-4946-b79a-163f5fec7e9d",
  },
];

export const SampleAttendee: Attendee = {
  name: `User ${randomId}`,
  id: randomId,
};
