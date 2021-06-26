"use strict";

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
var react_1 = __importDefault(require("react"));
var react_jss_1 = require("react-jss");
var Box_1 = __importDefault(require("./ui/Box"));
var Avatar_1 = __importDefault(require("./ui/Avatar"));
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var Typography_1 = __importDefault(require("./ui/Typography"));
var Utilities_1 = require("../core/Utilities");
var useStylesFromThemeFunction = react_jss_1.createUseStyles(function (theme) {
    return {
        container: {
            margin: "0 1rem 0 1rem",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        }
    };
});
var UserAvatar = function (_a) {
    var attendee = _a.attendee,
        isHandRaised = _a.isHandRaised,
        isMuted = _a.isMuted,
        props = __rest(_a, ["attendee", "isHandRaised", "isMuted"]);
    var classes = useStylesFromThemeFunction(props);
    var isMikeMute = isMuted === undefined ? true : isMuted;
    var Icon = isMikeMute ? free_solid_svg_icons_1.faMicrophoneSlash : free_solid_svg_icons_1.faMicrophone;
    return react_1.default.createElement(Box_1.default, { className: classes.container }, react_1.default.createElement(Avatar_1.default, null, Utilities_1.getShortHandName(attendee.info.name)), react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: Icon }), react_1.default.createElement(Box_1.default, null, react_1.default.createElement(Typography_1.default, null, attendee.info.name)), isHandRaised && react_1.default.createElement(Box_1.default, null, react_1.default.createElement(Typography_1.default, null, "Hand raised")));
};
exports.default = UserAvatar;