/// <reference types="react" />
import { ConferenceMode } from "../../types/App";
interface Props {
    mode: ConferenceMode;
}
declare const ConferenceContainer: ({ mode }: Props) => JSX.Element;
export default ConferenceContainer;
