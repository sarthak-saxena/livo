import Conference from "@voxeet/voxeet-web-sdk/types/models/Conference";
import { VoxeetConferenceEvents } from "./Voxeet";

export interface VoxeetContextType {
  conference?: Conference;
}
