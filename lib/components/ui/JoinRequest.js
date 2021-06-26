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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var voxeetHook_1 = require("../../services/hooks/voxeetHook");
var react_jss_1 = require("react-jss");
var Box_1 = __importDefault(require("./Box"));
var clsx_1 = __importDefault(require("clsx"));
var Typography_1 = __importDefault(require("./Typography"));
var Row_1 = __importDefault(require("./Row"));
var Column_1 = __importDefault(require("./Column"));
var Button_1 = __importDefault(require("./Button"));
var sdk_1 = require("../../core/voxeet/sdk");
var Voxeet_1 = require("../../types/Voxeet");
var useStylesFromThemeFunction = react_jss_1.createUseStyles(function (theme) {
    return {
        root: {
            width: "100%",
            marginBottom: "1rem !important"
        },
        permission: {
            padding: "0 1rem 1rem"
        },
        textSpeakerRequest: {
            marginTop: 0
        }
    };
});
var useOnMakeSpeakerCallback = function (setAttendees, attendees) {
    return react_1.default.useCallback(function (participant) {
        attendees.push(participant);
        setAttendees(Object.assign([], attendees));
    }, [attendees, setAttendees]);
};
var JoinRequest = function (_a) {
    var props = __rest(_a, []);
    var grantAccess = function (attendee) {
        sdk_1.grantConferenceSpeakerAccess(attendee.id);
        var index = attendees.findIndex(function (a) {
            return a.id === attendee.id;
        });
        attendees.splice(index, 1);
        setAttendees(Object.assign([], attendees));
        voxeetHook_1.voxeetHookCallback.call(Voxeet_1.VoxeetCommandType.GrantSpeakerAccess, attendee.id);
    };
    var denyAccess = function (attendee) {
        sdk_1.denyConferenceSpeakerAccess(attendee.id);
        var index = attendees.findIndex(function (a) {
            return a.id === attendee.id;
        });
        attendees.splice(index, 1);
        setAttendees(Object.assign([], attendees));
    };
    var _b = react_1.useState([]),
        attendees = _b[0],
        setAttendees = _b[1];
    var classes = useStylesFromThemeFunction(props);
    var onMakeSpeakerCallback = useOnMakeSpeakerCallback(setAttendees, attendees);
    voxeetHook_1.useOnRequestSpeakerAccess(onMakeSpeakerCallback);
    return react_1.default.createElement(react_1.default.Fragment, null, attendees.map(function (attendee, index) {
        return react_1.default.createElement("article", { key: index, className: clsx_1.default("panel is-info", classes.root) }, react_1.default.createElement("p", { className: clsx_1.default("panel-heading", classes.textSpeakerRequest) }, "Speaker Requests"), react_1.default.createElement(Box_1.default, { className: classes.permission }, react_1.default.createElement(Row_1.default, null, react_1.default.createElement(Column_1.default, null, react_1.default.createElement(Typography_1.default, null, attendee.info.name, " is requesting access to speak"))), react_1.default.createElement(Row_1.default, null, react_1.default.createElement(Column_1.default, null, react_1.default.createElement(Button_1.default, { className: "is-success", onClick: grantAccess.bind(_this, attendee) }, "Grant Access")), react_1.default.createElement(Column_1.default, null, react_1.default.createElement(Button_1.default, { onClick: denyAccess.bind(_this, attendee), className: "is-danger" }, "Deny")))));
    }));
};
exports.default = JoinRequest;