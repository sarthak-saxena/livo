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
var react_1 = __importStar(require("react"));
var ConnectedUsers_1 = __importDefault(require("../ConnectedUsers"));
var Callpad_1 = __importDefault(require("../../components/Callpad"));
var react_jss_1 = require("react-jss");
var clsx_1 = __importDefault(require("clsx"));
var Column_1 = __importDefault(require("../../components/ui/Column"));
var AttendeeList_1 = require("../../components/AttendeeList");
var Row_1 = __importDefault(require("../../components/ui/Row"));
var resizeMediaObserverHook_1 = require("../../services/hooks/resizeMediaObserverHook");
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
        attendeeListWrapperLg: {
            position: "relative"
        },
        attendeeListWrapperSm: {
            display: "none"
        }
    };
});
var Conference = function (_a) {
    var props = __rest(_a, []);
    var classes = useStylesFromThemeFunction(props);
    var _b = react_1.useState(false),
        isSmallScreen = _b[0],
        setSmallScreen = _b[1];
    var onResizeMediaCallback = resizeMediaObserverHook_1.useOnResizeMediaCallback(setSmallScreen);
    resizeMediaObserverHook_1.useResizeMediaObserver(onResizeMediaCallback);
    return react_1.default.createElement(Row_1.default, { className: clsx_1.default(classes.container) }, react_1.default.createElement(Column_1.default, { className: clsx_1.default("column", !isSmallScreen && "is-two-thirds", classes.attendeeAndCallpadContainer) }, react_1.default.createElement(ConnectedUsers_1.default, null), react_1.default.createElement(Callpad_1.default, null)), react_1.default.createElement(Column_1.default, { className: isSmallScreen ? classes.attendeeListWrapperSm : classes.attendeeListWrapperLg }, react_1.default.createElement(AttendeeList_1.AttendeeList, null)));
};
exports.default = Conference;