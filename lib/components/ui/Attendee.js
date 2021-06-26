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
exports.Attendee = void 0;
var Column_1 = __importDefault(require("./Column"));
var Row_1 = __importDefault(require("./Row"));
var clsx_1 = __importDefault(require("clsx"));
var Avatar_1 = __importStar(require("./Avatar"));
var Typography_1 = __importDefault(require("./Typography"));
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var Button_1 = __importDefault(require("./Button"));
var react_1 = __importStar(require("react"));
var sdk_1 = require("../../core/voxeet/sdk");
var react_jss_1 = require("react-jss");
var voxeetHook_1 = require("../../services/hooks/voxeetHook");
var Voxeet_1 = require("../../types/Voxeet");
var Utilities_1 = require("../../core/Utilities");
var useStylesFromThemeFunction = react_jss_1.createUseStyles(function (theme) {
    return {
        avatarWrapper: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        userWrapper: {
            alignItems: "center"
        },
        settingsWrapper: { display: "flex" }
    };
});
var useOnOnGrantSpeakerAccessCallback = function (id, enableMakeSpeakerButton) {
    return react_1.default.useCallback(function (attendeeId) {
        if (attendeeId === id) {
            enableMakeSpeakerButton(false);
        }
    }, [id, enableMakeSpeakerButton]);
};
var useOnMuteAttendeeCallback = function (muteMike, participantId) {
    return react_1.default.useCallback(function (attendeeId) {
        if (attendeeId === participantId) {
            muteMike(true);
        }
    }, [muteMike]);
};
var useOnUnMuteAttendeeCallback = function (muteMike, participantId) {
    return react_1.default.useCallback(function (attendeeId) {
        if (attendeeId === participantId) {
            muteMike(false);
        }
    }, [muteMike]);
};
var Attendee = function (_a) {
    var _b;
    var attendee = _a.attendee,
        isConferenceCreator = _a.isConferenceCreator,
        id = _a.id,
        props = __rest(_a, ["attendee", "isConferenceCreator", "id"]);
    var grantAccess = function () {
        if (isMakeSpeakerButtonEnabled) {
            sdk_1.grantConferenceSpeakerAccess(attendee.id);
            enableMakeSpeakerButton(false);
            voxeetHook_1.voxeetHookCallback.call(Voxeet_1.VoxeetCommandType.GrantSpeakerAccess, attendee.id);
        } else {
            sdk_1.revokeConferenceSpeakerAccess(attendee.id);
            enableMakeSpeakerButton(true);
            muteMike(true);
            voxeetHook_1.voxeetHookCallback.call(Voxeet_1.VoxeetCommandType.RevokeSpeakerAccess, attendee.id);
            sdk_1.invokeMuteAttendeeCommand(attendee.id);
            voxeetHook_1.voxeetHookCallback.call(Voxeet_1.VoxeetCommandType.MuteAttendee, attendee.id);
        }
    };
    var onMuteMike = function () {
        var mute = !isMikeMute;
        muteMike(mute);
        if (mute) {
            sdk_1.invokeMuteAttendeeCommand(attendee.id);
            voxeetHook_1.voxeetHookCallback.call(Voxeet_1.VoxeetCommandType.MuteAttendee, attendee.id);
        } else {
            sdk_1.invokeUnMuteAttendeeCommand(attendee.id);
            voxeetHook_1.voxeetHookCallback.call(Voxeet_1.VoxeetCommandType.UnMuteAttendee, attendee.id);
        }
    };
    var _c = react_1.useState(true),
        isMakeSpeakerButtonEnabled = _c[0],
        enableMakeSpeakerButton = _c[1];
    var _d = react_1.useState(true),
        isMikeMute = _d[0],
        muteMike = _d[1];
    var Icon = isMikeMute ? free_solid_svg_icons_1.faMicrophoneSlash : free_solid_svg_icons_1.faMicrophone;
    var classes = useStylesFromThemeFunction(props);
    var onOnGrantSpeakerAccessCallback = useOnOnGrantSpeakerAccessCallback(attendee.id, enableMakeSpeakerButton);
    var onMuteAttendeeCallback = useOnMuteAttendeeCallback(muteMike, attendee.id);
    var onUnMuteAttendeeCallback = useOnUnMuteAttendeeCallback(muteMike, attendee.id);
    voxeetHook_1.useOnGrantSpeakerAccess(onOnGrantSpeakerAccessCallback);
    voxeetHook_1.useOnMuteAttendee(onMuteAttendeeCallback);
    voxeetHook_1.useOnUnMuteAttendee(onUnMuteAttendeeCallback);
    return react_1.default.createElement(Row_1.default, { key: attendee.id }, react_1.default.createElement(Column_1.default, { className: "is-full" }, react_1.default.createElement(Row_1.default, { className: classes.userWrapper }, react_1.default.createElement(Column_1.default, { className: clsx_1.default("is-one-fifth", classes.avatarWrapper) }, react_1.default.createElement(Avatar_1.default, { size: Avatar_1.AvatarSize.Small }, Utilities_1.getShortHandName(attendee.info.name))), react_1.default.createElement(Column_1.default, null, react_1.default.createElement(Typography_1.default, null, attendee.info.name)), isConferenceCreator && id !== ((_b = attendee.info) === null || _b === void 0 ? void 0 : _b.externalId) && react_1.default.createElement(Column_1.default, { className: classes.settingsWrapper }, react_1.default.createElement(Button_1.default, { onClick: onMuteMike, disabled: isMakeSpeakerButtonEnabled }, react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { size: "sm", icon: Icon })), react_1.default.createElement(Button_1.default, { onClick: grantAccess }, react_1.default.createElement(Typography_1.default, null, isMakeSpeakerButtonEnabled ? "Make Speaker" : "Remove Speaker"))))));
};
exports.Attendee = Attendee;