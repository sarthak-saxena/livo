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
exports.AvatarSize = void 0;
var react_1 = __importDefault(require("react"));
var react_jss_1 = require("react-jss");
var clsx_1 = __importDefault(require("clsx"));
var AvatarSize;
(function (AvatarSize) {
    AvatarSize["Large"] = "large";
    AvatarSize["Small"] = "small";
})(AvatarSize = exports.AvatarSize || (exports.AvatarSize = {}));
var useStylesFromThemeFunction = react_jss_1.createUseStyles(function (theme) {
    return {
        avatar: {
            textAlign: "center",
            background: "gainsboro",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        large: {
            fontSize: "2rem",
            height: "100px",
            width: "100px"
        },
        small: {
            fontSize: "1rem",
            height: "50px",
            width: "50px"
        }
    };
});
var Avatar = function (_a) {
    var children = _a.children,
        className = _a.className,
        size = _a.size,
        props = __rest(_a, ["children", "className", "size"]);
    var classes = useStylesFromThemeFunction(props);
    return react_1.default.createElement("div", { className: clsx_1.default(className, classes.avatar, size && size === AvatarSize.Small ? classes.small : classes.large) }, children);
};
exports.default = Avatar;