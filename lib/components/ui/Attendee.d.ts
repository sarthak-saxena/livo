/// <reference types="react" />
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
interface Props {
    attendee: Participant;
    isConferenceCreator: boolean;
    id: string;
}
export declare const Attendee: ({ attendee, isConferenceCreator, id, ...props }: Props) => JSX.Element;
export {};
