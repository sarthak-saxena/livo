import { LocalStorageKeys } from "../../types/App"
import { useAttendee } from "./userHook";

export const useMuteState = () => {
    const { attendee } = useAttendee();
    const getMuteState = (): boolean => {
        const muteState = localStorage.getItem(`${LocalStorageKeys.muteState}-${attendee.id}`)
        return  muteState === "true" ? true : muteState === "false" ? false : undefined
    }
    const setMuteState = (mute: boolean) => {
        localStorage.setItem(`${LocalStorageKeys.muteState}-${attendee.id}`, mute.toString())
    }
    return {getMuteState, setMuteState}
}