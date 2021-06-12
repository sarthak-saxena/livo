/// <reference types="react" />
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
interface Props {
    attendee: Participant;
}
declare const UserAvatar: ({ attendee }: Props) => JSX.Element;
export default UserAvatar;
