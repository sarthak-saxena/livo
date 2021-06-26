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
var ConnectedUsers_1 = __importDefault(require("../ConnectedUsers"));
var Callpad_1 = __importDefault(require("../../components/Callpad"));
var react_jss_1 = require("react-jss");
var clsx_1 = __importDefault(require("clsx"));
var Column_1 = __importDefault(require("../../components/ui/Column"));
var AttendeeList_1 = require("../../components/AttendeeList");
var Row_1 = __importDefault(require("../../components/ui/Row"));
var useStylesFromThemeFunction = react_jss_1.createUseStyles(function (theme) {
    return {
        container: {
            height: "100%"
        },
        box: {
            width: "100%",
            height: "96%"
        },
        attendeeAndCallpadContainer: {
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column"
        },
        attendeeListWrapper: {
            position: "relative"
        }
    };
});
var Conference = function (_a) {
    var props = __rest(_a, []);
    var classes = useStylesFromThemeFunction(props);
    return react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(Row_1.default, { className: clsx_1.default(classes.container) }, react_1.default.createElement(Column_1.default, { className: clsx_1.default("column", "is-two-thirds", classes.attendeeAndCallpadContainer) }, react_1.default.createElement(ConnectedUsers_1.default, null), react_1.default.createElement(Callpad_1.default, null)), react_1.default.createElement(Column_1.default, { className: classes.attendeeListWrapper }, react_1.default.createElement(AttendeeList_1.AttendeeList, null))));
};
exports.default = Conference;