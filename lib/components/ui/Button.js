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
var clsx_1 = __importDefault(require("clsx"));
var useStylesFromThemeFunction = react_jss_1.createUseStyles(function (theme) {
    return {
        container: {
            padding: "0 10px 0 10px",
            fontSize: "14px"
        }
    };
});
var Button = function (_a) {
    var children = _a.children,
        className = _a.className,
        onClick = _a.onClick,
        disabled = _a.disabled,
        props = __rest(_a, ["children", "className", "onClick", "disabled"]);
    var classes = useStylesFromThemeFunction(props);
    return react_1.default.createElement("button", { onClick: onClick, className: clsx_1.default("button", className, classes.container), disabled: disabled }, children);
};
exports.default = Button;