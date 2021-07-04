"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnUnMuteAttendee = exports.useOnMuteAttendee = exports.useOnUnRaiseHand = exports.useOnRaiseHand = exports.useOnDenySpeakerAccess = exports.useOnRevokeSpeakerAccess = exports.useOnGrantSpeakerAccess = exports.useOnRequestSpeakerAccess = exports.useVoxeetStreamAdded = exports.voxeetHookCallback = exports.useVoxeet = void 0;
var react_1 = require("react");
var voxeetContext_1 = require("../context/voxeetContext");
var Voxeet_1 = require("../../types/Voxeet");
var voxeet_web_sdk_1 = __importDefault(require("@voxeet/voxeet-web-sdk"));
var callbackEventListener_1 = __importDefault(require("../../core/callbackEventListener"));
var conference = voxeet_web_sdk_1.default.conference;
var useVoxeet = function () {
    return react_1.useContext(voxeetContext_1.VoxeetContext);
};
exports.useVoxeet = useVoxeet;
exports.voxeetHookCallback = new callbackEventListener_1.default(true);
var useVoxeetStreamAdded = function (callback, onAttendeeAddCallback) {
    react_1.useEffect(function () {
        var streamAddListener = function (participant, stream) {
            callback(participant, stream, Voxeet_1.VoxeetConferenceEvents.StreamAdded);
            onAttendeeAddCallback && onAttendeeAddCallback(participant, Voxeet_1.VoxeetConferenceEvents.StreamAdded);
        };
        var streamRemoveListener = function (participant, stream) {
            callback(participant, stream, Voxeet_1.VoxeetConferenceEvents.StreamRemoved);
            onAttendeeAddCallback && onAttendeeAddCallback(participant, Voxeet_1.VoxeetConferenceEvents.StreamRemoved);
        };
        conference.on(Voxeet_1.VoxeetConferenceEvents.StreamAdded, streamAddListener);
        conference.on(Voxeet_1.VoxeetConferenceEvents.StreamRemoved, streamRemoveListener);
        return function cleanup() {
            conference.off(Voxeet_1.VoxeetConferenceEvents.StreamAdded, streamAddListener);
            conference.off(Voxeet_1.VoxeetConferenceEvents.StreamRemoved, streamRemoveListener);
        };
    }, []);
};
exports.useVoxeetStreamAdded = useVoxeetStreamAdded;
var useOnRequestSpeakerAccess = function (callback) {
    react_1.useEffect(function () {
        exports.voxeetHookCallback.on(Voxeet_1.VoxeetCommandType.RequestSpeakerAccess, function (participant) {
            callback(participant);
        });
    }, [callback]);
};
exports.useOnRequestSpeakerAccess = useOnRequestSpeakerAccess;
var useOnGrantSpeakerAccess = function (callback) {
    react_1.useEffect(function () {
        exports.voxeetHookCallback.on(Voxeet_1.VoxeetCommandType.GrantSpeakerAccess, function (attendeeId) {
            callback(attendeeId);
        });
    }, []);
};
exports.useOnGrantSpeakerAccess = useOnGrantSpeakerAccess;
var useOnRevokeSpeakerAccess = function (callback) {
    react_1.useEffect(function () {
        exports.voxeetHookCallback.on(Voxeet_1.VoxeetCommandType.RevokeSpeakerAccess, function (attendeeId) {
            callback(attendeeId);
        });
    }, []);
};
exports.useOnRevokeSpeakerAccess = useOnRevokeSpeakerAccess;
var useOnDenySpeakerAccess = function (callback) {
    react_1.useEffect(function () {
        exports.voxeetHookCallback.on(Voxeet_1.VoxeetCommandType.DenySpeakerAccess, function (participant) {
            callback(participant);
        });
    }, []);
};
exports.useOnDenySpeakerAccess = useOnDenySpeakerAccess;
var useOnRaiseHand = function (callback) {
    react_1.useEffect(function () {
        exports.voxeetHookCallback.on(Voxeet_1.VoxeetCommandType.RaiseHand, function (attendeeId) {
            callback(attendeeId);
        });
    }, []);
};
exports.useOnRaiseHand = useOnRaiseHand;
var useOnUnRaiseHand = function (callback) {
    react_1.useEffect(function () {
        exports.voxeetHookCallback.on(Voxeet_1.VoxeetCommandType.unRaiseHand, function (attendeeId) {
            callback(attendeeId);
        });
    }, []);
};
exports.useOnUnRaiseHand = useOnUnRaiseHand;
var useOnMuteAttendee = function (callback) {
    react_1.useEffect(function () {
        exports.voxeetHookCallback.on(Voxeet_1.VoxeetCommandType.MuteAttendee, function (attendeeId) {
            callback(attendeeId);
        });
    }, []);
};
exports.useOnMuteAttendee = useOnMuteAttendee;
var useOnUnMuteAttendee = function (callback) {
    react_1.useEffect(function () {
        exports.voxeetHookCallback.on(Voxeet_1.VoxeetCommandType.UnMuteAttendee, function (attendeeId) {
            callback(attendeeId);
        });
    }, []);
};
exports.useOnUnMuteAttendee = useOnUnMuteAttendee;