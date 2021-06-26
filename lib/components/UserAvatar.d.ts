/// <reference types="react" />
import { Participant } from "@voxeet/voxeet-web-sdk/types/models/Participant";
interface Props {
    attendee: Participant;
    isHandRaised: boolean;
    isMuted?: boolean;
}
declare const UserAvatar: ({ attendee, isHandRaised, isMuted, ...props }: Props) => JSX.Element;
export default UserAvatar;
