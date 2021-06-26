"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function () {
            return m[k];
        } });
} : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function (o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = this && this.__rest || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAttendeeAddCallback = void 0;
var react_1 = __importStar(require("react"));
var UserAvatar_1 = __importDefault(require("../components/UserAvatar"));
var voxeetHook_1 = require("../services/hooks/voxeetHook");
var Voxeet_1 = require("../types/Voxeet");
var userHook_1 = require("../services/hooks/userHook");
var react_jss_1 = require("react-jss");
var Box_1 = __importDefault(require("../components/ui/Box"));
var Typography_1 = __importDefault(require("../components/ui/Typography"));
var Column_1 = __importDefault(require("../components/ui/Column"));
var Row_1 = __importDefault(require("../components/ui/Row"));
var Utilities_1 = require("../core/Utilities");
var useStylesFromThemeFunction = react_jss_1.createUseStyles(function (theme) {
    return {
        root: {
            padding: 20
        },
        attendeeWrapper: {}
    };
});
var useAttendeeAddCallback = function (attendees, setAttendees) {
    return react_1.default.useCallback(function (participant, stream, eventType) {
        var attendeesLength = attendees.length;
        var index = attendees.findIndex(function (a) {
            return a.id === participant.id;
        });
        if (eventType === Voxeet_1.VoxeetConferenceEvents.StreamAdded) {
            if (index === -1) {
                attendees.push(participant);
            }
        } else if (eventType === Voxeet_1.VoxeetConferenceEvents.StreamRemoved) {
            if (index !== -1) {
                attendees.splice(index, 1);
            }
        }
        if (attendeesLength !== attendees.length) {
            setAttendees(Object.assign([], attendees));
        }
    }, [attendees, setAttendees]);
};
exports.useAttendeeAddCallback = useAttendeeAddCallback;
var useOnGrantSpeakerAccessCallback = function (speakers, setSpeakers) {
    return react_1.default.useCallback(function (attendeeId) {
        speakers[attendeeId] = true;
        setSpeakers(Object.assign({}, speakers));
    }, [speakers, setSpeakers]);
};
var useOnRevokeSpeakerAccessCallback = function (speakers, setSpeakers) {
    return react_1.default.useCallback(function (attendeeId) {
        speakers[attendeeId] = false;
        setSpeakers(Object.assign({}, speakers));
    }, [speakers, setSpeakers]);
};
var useOnRaiseHandCallback = function (setHandsRaised, handsRaised) {
    return react_1.default.useCallback(function (attendeeId) {
        handsRaised[attendeeId] = true;
        setHandsRaised(Object.assign({}, handsRaised));
    }, [setHandsRaised, handsRaised]);
};
var useOnUnRaiseHandCallback = function (setHandsRaised, handsRaised) {
    return react_1.default.useCallback(function (attendeeId) {
        handsRaised[attendeeId] = false;
        setHandsRaised(Object.assign({}, handsRaised));
    }, [setHandsRaised, handsRaised]);
};
var useOnMuteAttendeeCallback = function (micStatus, setMikeStatus) {
    return react_1.default.useCallback(function (attendeeId) {
        micStatus[attendeeId] = true;
        setMikeStatus(Object.assign({}, micStatus));
    }, [micStatus, setMikeStatus]);
};
var useOnUnMuteAttendeeCallback = function (micStatus, setMikeStatus) {
    return react_1.default.useCallback(function (attendeeId) {
        micStatus[attendeeId] = false;
        setMikeStatus(Object.assign({}, micStatus));
    }, [micStatus, setMikeStatus]);
};
var ConnectedUsers = function (_a) {
    var props = __rest(_a, []);
    var classes = useStylesFromThemeFunction(props);
    var conference = voxeetHook_1.useVoxeet().conference;
    var _b = react_1.useState({}),
        speakers = _b[0],
        setSpeakers = _b[1];
    var _c = react_1.useState({}),
        micStatus = _c[0],
        setMikeStatus = _c[1];
    var _d = react_1.useState({}),
        handsRaised = _d[0],
        setHandsRaised = _d[1];
    var _e = userHook_1.useAttendee(),
        onAttendeeAdd = _e.onAttendeeAdd,
        attendee = _e.attendee;
    var _f = react_1.useState([]),
        attendees = _f[0],
        setAttendees = _f[1];
    var onAttendeeAddCallback = exports.useAttendeeAddCallback(attendees, setAttendees);
    var onGrantSpeakerAccessCallback = useOnGrantSpeakerAccessCallback(speakers, setSpeakers);
    var onRevokeSpeakerAccessCallback = useOnRevokeSpeakerAccessCallback(speakers, setSpeakers);
    var onRaiseHandCallback = useOnRaiseHandCallback(setHandsRaised, attendee);
    var onUnRaiseHandCallback = useOnUnRaiseHandCallback(setHandsRaised, handsRaised);
    var onMuteAttendeeCallback = useOnMuteAttendeeCallback(micStatus, setMikeStatus);
    var onUnMuteAttendeeCallback = useOnUnMuteAttendeeCallback(micStatus, setMikeStatus);
    voxeetHook_1.useVoxeetStreamAdded(onAttendeeAddCallback, onAttendeeAdd);
    voxeetHook_1.useOnGrantSpeakerAccess(onGrantSpeakerAccessCallback);
    voxeetHook_1.useOnRevokeSpeakerAccess(onRevokeSpeakerAccessCallback);
    voxeetHook_1.useOnRaiseHand(onRaiseHandCallback);
    voxeetHook_1.useOnUnRaiseHand(onUnRaiseHandCallback);
    voxeetHook_1.useOnMuteAttendee(onMuteAttendeeCallback);
    voxeetHook_1.useOnUnMuteAttendee(onUnMuteAttendeeCallback);
    react_1.useEffect(function () {
        var attendees = Array.from(conference ? conference.participants.values() : []);
        setAttendees(attendees);
    }, [conference]);
    return react_1.default.createElement(Box_1.default, null, react_1.default.createElement(Column_1.default, null), react_1.default.createElement(Typography_1.default, null, "Members Connected: ", attendees.length), react_1.default.createElement(Row_1.default, null, react_1.default.createElement(Column_1.default, null, react_1.default.createElement(Typography_1.default, { className: "is-size-4" }, "Speakers:")), react_1.default.createElement(Row_1.default, null, attendees.map(function (voxeetAttendee) {
        if (speakers[voxeetAttendee.id] || Utilities_1.isCreator(voxeetAttendee)) {
            return react_1.default.createElement(Column_1.default, { className: "is-one-fifth", key: voxeetAttendee.id }, react_1.default.createElement(UserAvatar_1.default, { isHandRaised: handsRaised[voxeetAttendee.id], attendee: voxeetAttendee, isMuted: micStatus[voxeetAttendee.id] }));
        }
    }))), react_1.default.createElement(Row_1.default, null, react_1.default.createElement(Column_1.default, null, react_1.default.createElement(Typography_1.default, { className: "is-size-4" }, "Members:")), react_1.default.createElement(Row_1.default, null, attendees.map(function (voxeetAttendee) {
        if (!speakers[voxeetAttendee.id] && !Utilities_1.isCreator(voxeetAttendee)) {
            return react_1.default.createElement(Column_1.default, { className: "is-one-fifth", key: voxeetAttendee.id }, react_1.default.createElement(UserAvatar_1.default, { isHandRaised: handsRaised[voxeetAttendee.id], attendee: voxeetAttendee, isMuted: micStatus[voxeetAttendee.id] }));
        }
    }))));
};
exports.default = ConnectedUsers;