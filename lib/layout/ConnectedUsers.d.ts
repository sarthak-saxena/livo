/// <reference types="react" />
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
import { VoxeetConferenceEvents } from "../types/Voxeet";
export declare const useAttendeeAddCallback: (attendees: Participant[], setAttendees: (attendees: Participant[]) => void) => (participant: Participant, stream: MediaStream, eventType: VoxeetConferenceEvents) => void;
declare const ConnectedUsers: ({ ...props }: {
    [x: string]: any;
}) => JSX.Element;
export default ConnectedUsers;
