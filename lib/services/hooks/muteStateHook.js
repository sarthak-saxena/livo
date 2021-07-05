"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.useMuteState = void 0;
var App_1 = require("../../types/App");
var voxeetHook_1 = require("./voxeetHook");
var useMuteState = function () {
    var conference = voxeetHook_1.useVoxeet().conference;
    var getMuteState = function () {
        var muteState = localStorage.getItem(App_1.LocalStorageKeys.muteState + "-" + conference.id);
        return muteState === "true" ? true : muteState === "false" ? false : true;
    };
    var setMuteState = function (mute) {
        localStorage.setItem(App_1.LocalStorageKeys.muteState + "-" + conference.id, mute.toString());
    };
    return { getMuteState: getMuteState, setMuteState: setMuteState };
};
exports.useMuteState = useMuteState;