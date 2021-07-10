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
exports.AttendeeList = void 0;
var react_1 = __importStar(require("react"));
var Box_1 = __importDefault(require("./ui/Box"));
var react_jss_1 = require("react-jss");
var clsx_1 = __importDefault(require("clsx"));
var voxeetHook_1 = require("../services/hooks/voxeetHook");
var Row_1 = __importDefault(require("./ui/Row"));
var Typography_1 = __importDefault(require("./ui/Typography"));
var userHook_1 = require("../services/hooks/userHook");
var ConnectedUsers_1 = require("../layout/ConnectedUsers");
var JoinRequest_1 = __importDefault(require("./ui/JoinRequest"));
var Attendee_1 = require("./ui/Attendee");
var RaisehandRequest_1 = __importDefault(require("./RaisehandRequest"));
var useStylesFromThemeFunction = react_jss_1.createUseStyles(function (theme) {
    return {
        container: {
            width: "100%",
            height: "96%",
            position: "absolute",
            top: 0,
            right: "-4%",
            overflowY: "scroll",
            overflowX: "hidden"
        },
        avatarWrapper: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        userWrapper: {
            alignItems: "center"
        }
    };
});
var AttendeeList = function (_a) {
    var props = __rest(_a, []);
    var classes = useStylesFromThemeFunction(props);
    var conference = voxeetHook_1.useVoxeet().conference;
    var _b = react_1.useState([]),
        attendees = _b[0],
        setAttendees = _b[1];
    var callback = ConnectedUsers_1.useAttendeeAddCallback(attendees, setAttendees);
    var attendee = userHook_1.useAttendee().attendee;
    voxeetHook_1.useVoxeetStreamAdded(callback);
    react_1.useEffect(function () {
        var sync = function () {
            var attendees = Array.from(conference ? conference.participants.values() : []).filter(function (p) {
                return p.status === "Connected";
            });
            setAttendees(attendees);
        };
        sync();
        setTimeout(sync, 1000);
    }, []);
    return react_1.default.createElement(Box_1.default, { className: clsx_1.default("box", classes.container) }, react_1.default.createElement(Row_1.default, null, react_1.default.createElement(RaisehandRequest_1.default, null)), attendee.isConferenceCreator && react_1.default.createElement(Row_1.default, null, react_1.default.createElement(JoinRequest_1.default, null)), react_1.default.createElement(Row_1.default, null, react_1.default.createElement(Typography_1.default, { className: "is-size-4" }, "Attendees"), attendees.map(function (voxeetAttendee, index) {
        return react_1.default.createElement(Attendee_1.Attendee, { key: index, attendee: voxeetAttendee, isConferenceCreator: attendee.isConferenceCreator, id: attendee.id });
    })));
};
exports.AttendeeList = AttendeeList;