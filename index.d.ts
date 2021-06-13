import { ConferenceMode } from "./lib/types/App";
import { VoxeetConfig as VXConfig } from "./lib/types/Voxeet";
import { Attendee, Room } from "./lib/types/Conference";
interface Props {
  mode: ConferenceMode;
  voxeetConfig: VXConfig;
  attendee: Attendee;
  room: Room;
}

declare const App: ({
  mode,
  voxeetConfig,
  attendee,
  room,
}: Props) => JSX.Element;

declare interface VoxeetConfig {
  consumerKey: string;
  consumerSecret: string;
}
