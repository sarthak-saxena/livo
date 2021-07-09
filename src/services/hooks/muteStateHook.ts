import { LocalStorageKeys } from "../../types/App";
import { useVoxeet } from "./voxeetHook";

export const useMuteState = () => {
  const getMuteState = (): boolean => {
    const muteState = localStorage.getItem(`${LocalStorageKeys.muteState}`);
    return muteState === "true" ? true : muteState === "false" ? false : true;
  };
  const setMuteState = (mute: boolean) => {
    localStorage.setItem(`${LocalStorageKeys.muteState}`, mute.toString());
  };

  return { getMuteState, setMuteState };
};
