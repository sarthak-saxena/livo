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
var react_1 = __importStar(require("react"));
var sdk_1 = require("../core/voxeet/sdk");
var Row_1 = __importDefault(require("./ui/Row"));
var Box_1 = __importDefault(require("./ui/Box"));
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var react_jss_1 = require("react-jss");
var userHook_1 = require("../services/hooks/userHook");
var Button_1 = __importDefault(require("./ui/Button"));
var Column_1 = __importDefault(require("./ui/Column"));
var clsx_1 = __importDefault(require("clsx"));
var voxeetHook_1 = require("../services/hooks/voxeetHook");
var Voxeet_1 = require("../types/Voxeet");
var dataSyncHook_1 = require("../services/hooks/dataSyncHook");
var useStylesFromThemeFunction = react_jss_1.createUseStyles(function (theme) {
    return {
        root: {
            borderTop: "1px solid gainsboro",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 20px 0 20px",
            width: "94%",
            margin: "0 !important"
        },
        iconWrapper: {
            border: "1px solid gainsboro",
            borderRadius: "50%",
            padding: "1rem",
            "&:hover": {
                background: "gainsboro"
            },
            margin: "0 1rem 0 1rem"
        },
        micIcon: {
            height: "1.5rem",
            width: "1.4rem !important"
        },
        handIcon: {
            width: "1.2rem !important"
        },
        configWrapper: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        requestButton: {
            display: "flex",
            flexDirection: "row-reverse"
        },
        button: {
            width: "3.5rem",
            height: "3.5rem"
        }
    };
});
var useOnDenySpeakerAccessCallback = function (enableRequestSpeakerAccessButton) {
    return react_1.default.useCallback(function (participant) {
        enableRequestSpeakerAccessButton(true);
    }, [enableRequestSpeakerAccessButton]);
};
var useOnGrantSpeakerAccessCallback = function (muteMike, enableMike, enableRequestSpeakerAccessButton) {
    return react_1.default.useCallback(function (attendeeId) {
        if (attendeeId === sdk_1.getVoxeetSessionParticipantId()) {
            enableMike(true);
            enableRequestSpeakerAccessButton(false);
        }
    }, [muteMike, enableMike, enableRequestSpeakerAccessButton]);
};
var useOnRevokeSpeakerAccessCallback = function (muteMike, enableMike, enableRequestSpeakerAccessButton) {
    return react_1.default.useCallback(function (attendeeId) {
        if (attendeeId === sdk_1.getVoxeetSessionParticipantId()) {
            sdk_1.toggleMuteAttendee(undefined, true);
            muteMike(true);
            enableMike(false);
            enableRequestSpeakerAccessButton(true);
        }
    }, [muteMike, enableMike, enableRequestSpeakerAccessButton]);
};
var useOnMuteAttendeeCallback = function (muteMike) {
    var participantId = sdk_1.getVoxeetSessionParticipantId();
    return react_1.default.useCallback(function (attendeeId) {
        if (attendeeId === participantId) {
            var mute = true;
            muteMike(mute);
            sdk_1.toggleMuteAttendee(undefined, mute);
        }
    }, [muteMike]);
};
var useOnUnMuteAttendeeCallback = function (muteMike) {
    var participantId = sdk_1.getVoxeetSessionParticipantId();
    return react_1.default.useCallback(function (attendeeId) {
        if (attendeeId === participantId) {
            var mute = false;
            muteMike(mute);
            sdk_1.toggleMuteAttendee(undefined, mute);
        }
    }, [muteMike]);
};
var CallPad = function (_a) {
    var props = __rest(_a, []);
    var requestSpeakerAccess = function () {
        sdk_1.requestConferenceSpeakerAccess();
        enableRequestSpeakerAccessButton(false);
    };
    var participantId = sdk_1.getVoxeetSessionParticipantId();
    var raiseHand = function () {
        var value = !isHandRaised;
        if (value) {
            sdk_1.raiseHandInConference(participantId);
            voxeetHook_1.voxeetHookCallback.call(Voxeet_1.VoxeetCommandType.RaiseHand, participantId);
        } else {
            sdk_1.unRaiseHandInConference(participantId);
            voxeetHook_1.voxeetHookCallback.call(Voxeet_1.VoxeetCommandType.unRaiseHand, participantId);
        }
        setHandRaised(value);
    };
    var attendee = userHook_1.useAttendee().attendee;
    var dataSync = dataSyncHook_1.useDataSync();
    var setHandRaisedDefault = false,
        muteMikeDefault = true,
        enableMikeDefault = attendee.isConferenceCreator,
        requestSpeakerAccessButtonEnabledDefault = true;
    if (dataSync[participantId]) {
        var state = dataSync[participantId];
        setHandRaisedDefault = state.handRaised || setHandRaisedDefault;
        muteMikeDefault = state.mute || muteMikeDefault;
        enableMikeDefault = state.speaker || enableMikeDefault;
        requestSpeakerAccessButtonEnabledDefault = state.speaker === undefined ? requestSpeakerAccessButtonEnabledDefault : !state.speaker;
    }
    var classes = useStylesFromThemeFunction(props);
    var _b = react_1.useState(setHandRaisedDefault),
        isHandRaised = _b[0],
        setHandRaised = _b[1];
    var _c = react_1.useState(muteMikeDefault),
        isMikeMute = _c[0],
        muteMike = _c[1];
    var _d = react_1.useState(enableMikeDefault),
        isMikeEnabled = _d[0],
        enableMike = _d[1];
    var _e = react_1.useState(requestSpeakerAccessButtonEnabledDefault),
        requestSpeakerAccessButtonEnabled = _e[0],
        enableRequestSpeakerAccessButton = _e[1];
    var muteMikeCallback = react_1.useCallback(function () {
        var mute = !isMikeMute;
        if (mute) {
            sdk_1.invokeMuteAttendeeCommand(participantId);
            voxeetHook_1.voxeetHookCallback.call(Voxeet_1.VoxeetCommandType.MuteAttendee, participantId);
        } else {
            sdk_1.invokeUnMuteAttendeeCommand(participantId);
            voxeetHook_1.voxeetHookCallback.call(Voxeet_1.VoxeetCommandType.UnMuteAttendee, participantId);
        }
    }, [isMikeMute]);
    var Icon = isMikeMute ? free_solid_svg_icons_1.faMicrophoneSlash : free_solid_svg_icons_1.faMicrophone;
    var onDenySpeakerAccessCallback = useOnDenySpeakerAccessCallback(enableRequestSpeakerAccessButton);
    var onGrantSpeakerAccess = useOnGrantSpeakerAccessCallback(muteMike, enableMike, enableRequestSpeakerAccessButton);
    var onRevokeSpeakerAccess = useOnRevokeSpeakerAccessCallback(muteMike, enableMike, enableRequestSpeakerAccessButton);
    var onMuteAttendeeCallback = useOnMuteAttendeeCallback(muteMike);
    var onUnMuteAttendeeCallback = useOnUnMuteAttendeeCallback(muteMike);
    voxeetHook_1.useOnDenySpeakerAccess(onDenySpeakerAccessCallback);
    voxeetHook_1.useOnGrantSpeakerAccess(onGrantSpeakerAccess);
    voxeetHook_1.useOnRevokeSpeakerAccess(onRevokeSpeakerAccess);
    voxeetHook_1.useOnMuteAttendee(onMuteAttendeeCallback);
    voxeetHook_1.useOnUnMuteAttendee(onUnMuteAttendeeCallback);
    return react_1.default.createElement(Row_1.default, { className: classes.root }, react_1.default.createElement(Column_1.default, { className: clsx_1.default("is-two-thirds", classes.configWrapper) }, react_1.default.createElement(Box_1.default, { onClick: function () {
            sdk_1.purgeVoxeetConference();
        }, className: classes.iconWrapper }, react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { size: "lg", icon: free_solid_svg_icons_1.faPhone })), react_1.default.createElement(Box_1.default, null, react_1.default.createElement("button", { onClick: muteMikeCallback, className: clsx_1.default(classes.iconWrapper, classes.button, "button"), disabled: attendee.isConferenceCreator ? false : !isMikeEnabled }, react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { size: "lg", icon: Icon, className: classes.micIcon }))), react_1.default.createElement(Box_1.default, { className: classes.iconWrapper }, react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { size: "lg", icon: free_solid_svg_icons_1.faSlidersH })), react_1.default.createElement(Box_1.default, null, react_1.default.createElement("button", { onClick: raiseHand, className: clsx_1.default(classes.iconWrapper, classes.button, "button", isHandRaised && "is-link") }, react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { className: classes.handIcon, size: "lg", icon: free_solid_svg_icons_1.faHandPointUp })))), !attendee.isConferenceCreator && react_1.default.createElement(Column_1.default, { className: classes.requestButton }, react_1.default.createElement(Box_1.default, null, react_1.default.createElement(Button_1.default, { disabled: !requestSpeakerAccessButtonEnabled, onClick: requestSpeakerAccess, className: "is-link" }, "Request speaker access"))));
};
exports.default = CallPad;