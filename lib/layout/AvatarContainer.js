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
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var UserAvatar_1 = __importDefault(require("../components/UserAvatar"));
var core_1 = require("@material-ui/core");
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var voxeetHook_1 = require("../services/hooks/voxeetHook");
var Voxeet_1 = require("../types/Voxeet");
var useStyles = core_1.makeStyles(function (theme) {
    return {
        root: {
            padding: 20
        }
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
var UserAvatarContainer = function () {
    var classes = useStyles();
    var conference = voxeetHook_1.useVoxeet().conference;
    var _a = react_1.useState([]),
        attendees = _a[0],
        setAttendees = _a[1];
    var onAttendeeAddCallback = useAttendeeAddCallback(attendees, setAttendees);
    voxeetHook_1.useVoxeetStreamAdded(onAttendeeAddCallback);
    react_1.useEffect(function () {
        var attendees = Array.from(conference ? conference.participants.values() : []);
        setAttendees(attendees);
    }, [conference]);
    return react_1.default.createElement(core_1.Box, null, react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(Typography_1.default, null, "On Air"), react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, className: classes.root }, react_1.default.createElement(Grid_1.default, { item: true, lg: 2, md: 2, sm: 3, xs: 3 }))), react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(Typography_1.default, null, "Members Connected: ", attendees.length), react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, className: classes.root }, attendees.map(function (attendee) {
        return react_1.default.createElement(Grid_1.default, { item: true, lg: 2, md: 2, sm: 3, xs: 3, key: attendee.id }, react_1.default.createElement(UserAvatar_1.default, { attendee: attendee }));
    }))));
};
exports.default = UserAvatarContainer;