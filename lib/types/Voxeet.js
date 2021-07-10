"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantStatus = exports.VoxeetCommandType = exports.VoxeetConferenceEvents = void 0;
var VoxeetConferenceEvents;
(function (VoxeetConferenceEvents) {
    VoxeetConferenceEvents["StreamAdded"] = "streamAdded";
    VoxeetConferenceEvents["StreamRemoved"] = "streamRemoved";
})(VoxeetConferenceEvents = exports.VoxeetConferenceEvents || (exports.VoxeetConferenceEvents = {}));
var VoxeetCommandType;
(function (VoxeetCommandType) {
    VoxeetCommandType["RequestSpeakerAccess"] = "RequestSpeakerAccess";
    VoxeetCommandType["GrantSpeakerAccess"] = "GrantSpeakerAccess";
    VoxeetCommandType["RevokeSpeakerAccess"] = "RevokeSpeakerAccess";
    VoxeetCommandType["MuteAttendee"] = "MuteAttendee";
    VoxeetCommandType["UnMuteAttendee"] = "UnMuteAttendee";
    VoxeetCommandType["DenySpeakerAccess"] = "DenySpeakerAccess";
    VoxeetCommandType["RaiseHand"] = "RaiseHand";
    VoxeetCommandType["unRaiseHand"] = "unRaiseHand";
    VoxeetCommandType["RequestDataSync"] = "RequestDataSync";
    VoxeetCommandType["ResponseDataSync"] = "ResponseDataSync";
})(VoxeetCommandType = exports.VoxeetCommandType || (exports.VoxeetCommandType = {}));
var ParticipantStatus;
(function (ParticipantStatus) {
    ParticipantStatus["Connected"] = "Connected";
    ParticipantStatus["Left"] = "Left";
})(ParticipantStatus = exports.ParticipantStatus || (exports.ParticipantStatus = {}));