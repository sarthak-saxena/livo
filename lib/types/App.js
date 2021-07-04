"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageKeys = exports.ConferenceMode = void 0;
var ConferenceMode;
(function (ConferenceMode) {
    ConferenceMode["AudioConference"] = "AudioConference";
    ConferenceMode["LiveStream"] = "LiveStream";
    ConferenceMode["VideoConference"] = "VideoConference";
})(ConferenceMode = exports.ConferenceMode || (exports.ConferenceMode = {}));
var LocalStorageKeys;
(function (LocalStorageKeys) {
    LocalStorageKeys["muteState"] = "voxeetSdkMuteState";
})(LocalStorageKeys = exports.LocalStorageKeys || (exports.LocalStorageKeys = {}));