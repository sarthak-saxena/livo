"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.useMuteState = void 0;
var App_1 = require("../../types/App");
var userHook_1 = require("./userHook");
var useMuteState = function () {
    var attendee = userHook_1.useAttendee().attendee;
    var getMuteState = function () {
        var muteState = localStorage.getItem(App_1.LocalStorageKeys.muteState + "-" + attendee.id);
        return muteState === "true" ? true : muteState === "false" ? false : undefined;
    };
    var setMuteState = function (mute) {
        localStorage.setItem(App_1.LocalStorageKeys.muteState + "-" + attendee.id, mute.toString());
    };
    return { getMuteState: getMuteState, setMuteState: setMuteState };
};
exports.useMuteState = useMuteState;