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
var VideoStream_1 = __importDefault(require("../components/VideoStream"));
var Column_1 = __importDefault(require("../components/ui/Column"));
var react_jss_1 = require("react-jss");
var useStylesFromThemeFunction = react_jss_1.createUseStyles(function (theme) {
    return {
        root: {
            padding: 20
        }
    };
});
var VideoStreamContainer = function (_a) {
    var props = __rest(_a, []);
    var classes = useStylesFromThemeFunction(props);
    return react_1.default.createElement(Column_1.default, null, react_1.default.createElement(VideoStream_1.default, null), react_1.default.createElement(VideoStream_1.default, null), react_1.default.createElement(VideoStream_1.default, null), react_1.default.createElement(VideoStream_1.default, null));
};
exports.default = VideoStreamContainer;