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
var core_1 = require("@material-ui/core");
var CallEnd_1 = __importDefault(require("@material-ui/icons/CallEnd"));
var Mic_1 = __importDefault(require("@material-ui/icons/Mic"));
var MicOff_1 = __importDefault(require("@material-ui/icons/MicOff"));
var Settings_1 = __importDefault(require("@material-ui/icons/Settings"));
var sdk_1 = require("../core/voxeet/sdk");
var useStyles = core_1.makeStyles(function (theme) {
    return {
        root: {
            padding: 20,
            position: "fixed",
            bottom: 0,
            borderTop: "1px solid gainsboro"
        },
        icon: {
            border: "1px solid gainsboro",
            borderRadius: "50%",
            padding: "1rem",
            "&:hover": {
                background: "gainsboro"
            }
        }
    };
});
var CallPad = function () {
    var classes = useStyles();
    var _a = react_1.useState(false),
        isMikeMute = _a[0],
        muteMike = _a[1];
    var muteMikeCallback = react_1.useCallback(function () {
        sdk_1.toggleMuteSelfAttendee();
        muteMike(!isMikeMute);
    }, [isMikeMute]);
    var Icon = isMikeMute ? MicOff_1.default : Mic_1.default;
    return react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(core_1.Grid, { direction: "row", alignItems: "center", justify: "center", spacing: 1, container: true, className: classes.root }, react_1.default.createElement(core_1.Grid, { item: true, onClick: function () {
            sdk_1.purgeVoxeet();
        } }, react_1.default.createElement(CallEnd_1.default, { className: classes.icon })), react_1.default.createElement(core_1.Grid, { item: true }, react_1.default.createElement(core_1.Box, { onClick: muteMikeCallback }, react_1.default.createElement(Icon, { className: classes.icon }))), react_1.default.createElement(core_1.Grid, { item: true }, react_1.default.createElement(Settings_1.default, { className: classes.icon }))));
};
exports.default = CallPad;