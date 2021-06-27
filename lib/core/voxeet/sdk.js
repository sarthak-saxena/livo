"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = this && this.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function () {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0:case 1:
                    t = op;break;
                case 4:
                    _.label++;return { value: op[1], done: false };
                case 5:
                    _.label++;y = op[1];op = [0];continue;
                case 7:
                    op = _.ops.pop();_.trys.pop();continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];t = op;break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];_.ops.push(op);break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVoxeetSessionParticipantId = exports.addEventlistenersForCommanding = exports.responseDataSync = exports.requestDataSync = exports.unRaiseHandInConference = exports.invokeUnMuteAttendeeCommand = exports.invokeMuteAttendeeCommand = exports.raiseHandInConference = exports.denyConferenceSpeakerAccess = exports.revokeConferenceSpeakerAccess = exports.grantConferenceSpeakerAccess = exports.requestConferenceSpeakerAccess = exports.isAttendeeMuted = exports.toggleMuteAttendee = exports.joinConference = exports.createConference = exports.purgeVoxeetConference = exports.purgeVoxeetSession = exports.initializeVoxeet = void 0;
var voxeet_web_sdk_1 = __importDefault(require("@voxeet/voxeet-web-sdk"));
var Voxeet_1 = require("../../types/Voxeet");
var voxeetHook_1 = require("../../services/hooks/voxeetHook");
var App_1 = require("../../App");
var CommandingEventSeparator = "^_^";
var initializeVoxeet = function (config, creator, room) {
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, conference, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    voxeet_web_sdk_1.default.initialize(config.consumerKey, config.consumerSecret);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6,, 7]);
                    _a = voxeet_web_sdk_1.default.session.participant;
                    if (!_a) return [3, 3];
                    return [4, exports.purgeVoxeetSession()];
                case 2:
                    _a = _b.sent();
                    _b.label = 3;
                case 3:
                    _a;
                    return [4, voxeet_web_sdk_1.default.session.open({
                        name: creator.name + " " + (creator.isConferenceCreator ? "(admin)" : ""),
                        externalId: creator.id
                    })];
                case 4:
                    _b.sent();
                    return [4, exports.createConference(room)];
                case 5:
                    conference = _b.sent();
                    console.log("conference joined with participants", conference.participants);
                    exports.addEventlistenersForCommanding(creator.isConferenceCreator);
                    controlMuteState();
                    return [2, conference];
                case 6:
                    e_1 = _b.sent();
                    alert("Error in joining conference: " + e_1);
                    return [3, 7];
                case 7:
                    return [2];
            }
        });
    });
};
exports.initializeVoxeet = initializeVoxeet;
var controlMuteState = function () {
    exports.toggleMuteAttendee(undefined, false);
};
var purgeVoxeetSession = function () {
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [4, voxeet_web_sdk_1.default.session.close()];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
};
exports.purgeVoxeetSession = purgeVoxeetSession;
var purgeVoxeetConference = function () {
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [4, voxeet_web_sdk_1.default.conference.leave({ leaveRoom: true })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
};
exports.purgeVoxeetConference = purgeVoxeetConference;
var getConferenceId = function (room) {
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [4, voxeet_web_sdk_1.default.conference.create({
                        alias: room.id,
                        params: {
                            dolbyVoice: true
                        }
                    }).then(function (conference) {
                        return conference.id;
                    })];
                case 1:
                    return [2, _a.sent()];
            }
        });
    });
};
var createConference = function (room, joinInfo) {
    if (joinInfo === void 0) {
        joinInfo = { constraints: { audio: true } };
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var conferenceId, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3,, 4]);
                    return [4, getConferenceId(room)];
                case 1:
                    conferenceId = _a.sent();
                    return [4, exports.joinConference(conferenceId, joinInfo)];
                case 2:
                    return [2, _a.sent()];
                case 3:
                    e_2 = _a.sent();
                    throw new Error(e_2);
                case 4:
                    return [2];
            }
        });
    });
};
exports.createConference = createConference;
var joinConference = function (conferenceId, joinOptions) {
    return __awaiter(void 0, void 0, void 0, function () {
        var conference, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3,, 4]);
                    return [4, voxeet_web_sdk_1.default.conference.fetch(conferenceId)];
                case 1:
                    conference = _a.sent();
                    console.log("conference join link", window.location.origin + "/?conferenceId=" + conferenceId);
                    return [4, voxeet_web_sdk_1.default.conference.join(conference, joinOptions)];
                case 2:
                    return [2, _a.sent()];
                case 3:
                    e_3 = _a.sent();
                    throw new Error(e_3);
                case 4:
                    return [2];
            }
        });
    });
};
exports.joinConference = joinConference;
var toggleMuteAttendee = function (participant, muted) {
    voxeet_web_sdk_1.default.conference.mute(participant || voxeet_web_sdk_1.default.session.participant, muted || !voxeet_web_sdk_1.default.conference.isMuted());
};
exports.toggleMuteAttendee = toggleMuteAttendee;
var isAttendeeMuted = function () {
    return voxeet_web_sdk_1.default.conference.isMuted();
};
exports.isAttendeeMuted = isAttendeeMuted;
var muteAttendee = function (participant, isMuted) {
    voxeet_web_sdk_1.default.conference.mute(participant, isMuted);
};
var requestConferenceSpeakerAccess = function () {
    voxeet_web_sdk_1.default.command.send("" + Voxeet_1.VoxeetCommandType.RequestSpeakerAccess + CommandingEventSeparator + voxeet_web_sdk_1.default.session.participant.id);
};
exports.requestConferenceSpeakerAccess = requestConferenceSpeakerAccess;
var grantConferenceSpeakerAccess = function (attendeeId) {
    voxeet_web_sdk_1.default.command.send("" + Voxeet_1.VoxeetCommandType.GrantSpeakerAccess + CommandingEventSeparator + attendeeId);
};
exports.grantConferenceSpeakerAccess = grantConferenceSpeakerAccess;
var revokeConferenceSpeakerAccess = function (attendeeId) {
    voxeet_web_sdk_1.default.command.send("" + Voxeet_1.VoxeetCommandType.RevokeSpeakerAccess + CommandingEventSeparator + attendeeId);
};
exports.revokeConferenceSpeakerAccess = revokeConferenceSpeakerAccess;
var denyConferenceSpeakerAccess = function (attendeeId) {
    voxeet_web_sdk_1.default.command.send("" + Voxeet_1.VoxeetCommandType.DenySpeakerAccess + CommandingEventSeparator + attendeeId);
};
exports.denyConferenceSpeakerAccess = denyConferenceSpeakerAccess;
var raiseHandInConference = function (attendeeId) {
    voxeet_web_sdk_1.default.command.send("" + Voxeet_1.VoxeetCommandType.RaiseHand + CommandingEventSeparator + attendeeId);
};
exports.raiseHandInConference = raiseHandInConference;
var invokeMuteAttendeeCommand = function (attendeeId) {
    voxeet_web_sdk_1.default.command.send("" + Voxeet_1.VoxeetCommandType.MuteAttendee + CommandingEventSeparator + attendeeId);
};
exports.invokeMuteAttendeeCommand = invokeMuteAttendeeCommand;
var invokeUnMuteAttendeeCommand = function (attendeeId) {
    voxeet_web_sdk_1.default.command.send("" + Voxeet_1.VoxeetCommandType.UnMuteAttendee + CommandingEventSeparator + attendeeId);
};
exports.invokeUnMuteAttendeeCommand = invokeUnMuteAttendeeCommand;
var unRaiseHandInConference = function (attendeeId) {
    voxeet_web_sdk_1.default.command.send("" + Voxeet_1.VoxeetCommandType.unRaiseHand + CommandingEventSeparator + attendeeId);
};
exports.unRaiseHandInConference = unRaiseHandInConference;
var requestDataSync = function (attendeeId) {
    voxeet_web_sdk_1.default.command.send("" + Voxeet_1.VoxeetCommandType.RequestDataSync + CommandingEventSeparator + attendeeId);
};
exports.requestDataSync = requestDataSync;
var responseDataSync = function (attendeeId, strngifiedResponse) {
    voxeet_web_sdk_1.default.command.send("" + Voxeet_1.VoxeetCommandType.ResponseDataSync + CommandingEventSeparator + attendeeId + CommandingEventSeparator + strngifiedResponse);
};
exports.responseDataSync = responseDataSync;
var addEventlistenersForCommanding = function (isConferenceCreator) {
    var participant = voxeet_web_sdk_1.default.session.participant;
    voxeet_web_sdk_1.default.command.on("received", function (participantWhoEmittedEvent, data) {
        data = data.split(CommandingEventSeparator);
        var message = data[0];
        var attendeeId = data[1];
        var payload = data[2];
        switch (message) {
            case Voxeet_1.VoxeetCommandType.RequestSpeakerAccess:
                voxeetHook_1.voxeetHookCallback.call(Voxeet_1.VoxeetCommandType.RequestSpeakerAccess, participantWhoEmittedEvent);
                break;
            case Voxeet_1.VoxeetCommandType.GrantSpeakerAccess:
                voxeetHook_1.voxeetHookCallback.call(Voxeet_1.VoxeetCommandType.GrantSpeakerAccess, attendeeId);
                break;
            case Voxeet_1.VoxeetCommandType.RevokeSpeakerAccess:
                voxeetHook_1.voxeetHookCallback.call(Voxeet_1.VoxeetCommandType.RevokeSpeakerAccess, attendeeId);
                break;
            case Voxeet_1.VoxeetCommandType.DenySpeakerAccess:
                if (attendeeId === participant.id) {
                    voxeetHook_1.voxeetHookCallback.call(Voxeet_1.VoxeetCommandType.DenySpeakerAccess, participant);
                }
                break;
            case Voxeet_1.VoxeetCommandType.RaiseHand:
                voxeetHook_1.voxeetHookCallback.call(Voxeet_1.VoxeetCommandType.RaiseHand, attendeeId);
                break;
            case Voxeet_1.VoxeetCommandType.unRaiseHand:
                voxeetHook_1.voxeetHookCallback.call(Voxeet_1.VoxeetCommandType.unRaiseHand, attendeeId);
                break;
            case Voxeet_1.VoxeetCommandType.MuteAttendee:
                voxeetHook_1.voxeetHookCallback.call(Voxeet_1.VoxeetCommandType.MuteAttendee, attendeeId);
                break;
            case Voxeet_1.VoxeetCommandType.UnMuteAttendee:
                voxeetHook_1.voxeetHookCallback.call(Voxeet_1.VoxeetCommandType.UnMuteAttendee, attendeeId);
                break;
            case Voxeet_1.VoxeetCommandType.RequestDataSync:
                exports.responseDataSync(attendeeId, JSON.stringify(App_1.dataStore.getData()));
                break;
            case Voxeet_1.VoxeetCommandType.ResponseDataSync:
                if (attendeeId === participant.id && payload) {
                    App_1.dataStore.dataSyncCallback.call(Voxeet_1.VoxeetCommandType.ResponseDataSync, JSON.parse(payload));
                }
                break;
            default:
                console.error("Unknown command type");
        }
    });
};
exports.addEventlistenersForCommanding = addEventlistenersForCommanding;
var getVoxeetSessionParticipantId = function () {
    return voxeet_web_sdk_1.default.session.participant.id;
};
exports.getVoxeetSessionParticipantId = getVoxeetSessionParticipantId;