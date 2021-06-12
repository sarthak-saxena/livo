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
exports.App = void 0;
var react_1 = __importStar(require("react"));
var styles_1 = require("@material-ui/core/styles");
var sdk_1 = require("./core/voxeet/sdk");
var ConferenceContainer_1 = __importDefault(require("./layout/conference/ConferenceContainer"));
var voxeetContext_1 = require("./services/context/voxeetContext");
var Theme = styles_1.createMuiTheme();
Theme = styles_1.responsiveFontSizes(Theme);
var App = function (_a) {
    var mode = _a.mode,
        voxeetConfig = _a.voxeetConfig,
        attendee = _a.attendee,
        room = _a.room;
    var _b = react_1.useState(undefined),
        conference = _b[0],
        setConference = _b[1];
    react_1.useEffect(function () {
        sdk_1.initializeVoxeet(voxeetConfig, attendee, room).then(function (conference) {
            conference && setConference(conference);
        });
    }, [voxeetConfig, attendee, room]);
    return react_1.default.createElement(react_1.default.Fragment, null, conference && react_1.default.createElement(styles_1.ThemeProvider, { theme: Theme }, react_1.default.createElement(voxeetContext_1.VoxeetContext.Provider, { value: { conference: conference } }, react_1.default.createElement(ConferenceContainer_1.default, { mode: mode }))));
};
exports.App = App;