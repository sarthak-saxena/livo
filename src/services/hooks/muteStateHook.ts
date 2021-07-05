import { LocalStorageKeys } from "../../types/App";
import { useVoxeet } from "./voxeetHook";

export const useMuteState = () => {
  const { conference } = useVoxeet();
  const getMuteState = (): boolean => {
    const muteState = localStorage.getItem(
      `${LocalStorageKeys.muteState}-${conference.id}`
    );
    return muteState === "true" ? true : muteState === "false" ? false : true;
  };
  const setMuteState = (mute: boolean) => {
    localStorage.setItem(
      `${LocalStorageKeys.muteState}-${conference.id}`,
      mute.toString()
    );
  };

  return { getMuteState, setMuteState };
};
