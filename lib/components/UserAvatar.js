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
var Avatar_1 = __importDefault(require("@material-ui/core/Avatar"));
var react_1 = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var colors_1 = require("@material-ui/core/colors");
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var clsx_1 = __importDefault(require("clsx"));
var Mic_1 = __importDefault(require("@material-ui/icons/Mic"));
var MicOff_1 = __importDefault(require("@material-ui/icons/MicOff"));
var useStyles = core_1.makeStyles(function (theme) {
    return {
        orange: {
            color: theme.palette.getContrastText(colors_1.deepOrange[500]),
            backgroundColor: colors_1.deepOrange[500]
        },
        purple: {
            color: theme.palette.getContrastText(colors_1.deepPurple[500]),
            backgroundColor: colors_1.deepPurple[500]
        },
        large: {
            width: theme.spacing(8.5),
            height: theme.spacing(8.5)
        },
        iconWrapper: {
            marginTop: "-1rem",
            zIndex: 1
        },
        paper: {
            borderRadius: "37%"
        }
    };
});
var UserAvatar = function (_a) {
    var attendee = _a.attendee;
    var classes = useStyles();
    var _b = react_1.useState(true),
        isMikeMute = _b[0],
        muteMike = _b[1];
    var Icon = isMikeMute ? MicOff_1.default : Mic_1.default;
    return react_1.default.createElement(core_1.Grid, { direction: "column", alignItems: "center", justify: "center", spacing: 1, container: true }, react_1.default.createElement(Avatar_1.default, { className: clsx_1.default(classes.orange, classes.large) }, "SS"), react_1.default.createElement(core_1.Box, { className: classes.iconWrapper }, react_1.default.createElement(core_1.Paper, { className: classes.paper }, react_1.default.createElement(Icon, { fontSize: "small" }))), react_1.default.createElement(Typography_1.default, null, attendee.info.name));
};
exports.default = UserAvatar;