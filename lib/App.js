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
var sdk_1 = require("./core/voxeet/sdk");
var ConferenceContainer_1 = __importDefault(require("./layout/conference/ConferenceContainer"));
var voxeetContext_1 = require("./services/context/voxeetContext");
var userContext_1 = require("./services/context/userContext");
var theming_1 = require("theming");
require("./styles/index.sass");
var Box_1 = __importDefault(require("./components/ui/Box"));
var theme = {
    color: "black",
    background: "white"
};
var App = function (_a) {
    var mode = _a.mode,
        apiConfig = _a.apiConfig,
        attendee = _a.attendee,
        room = _a.room,
        onAttendeeAdd = _a.onAttendeeAdd,
        onAppInitializedSuccessCallback = _a.onAppInitializedSuccessCallback,
        onAppInitializedErrorCallback = _a.onAppInitializedErrorCallback;
    var _b = react_1.useState(undefined),
        conference = _b[0],
        setConference = _b[1];
    react_1.useEffect(function () {
        sdk_1.initializeVoxeet(apiConfig, attendee, room).then(function (conference) {
            if (conference) {
                setConference(conference);
                onAppInitializedSuccessCallback && onAppInitializedSuccessCallback(conference);
            }
        }).catch(function (error) {
            onAppInitializedErrorCallback && onAppInitializedErrorCallback(error);
        });
    }, [apiConfig, attendee, room, onAppInitializedSuccessCallback, onAppInitializedErrorCallback]);
    return react_1.default.createElement(theming_1.ThemeProvider, { theme: theme }, react_1.default.createElement(userContext_1.UserContext.Provider, { value: { attendee: attendee, onAttendeeAdd: onAttendeeAdd } }, conference ? react_1.default.createElement(voxeetContext_1.VoxeetContext.Provider, { value: { conference: conference } }, react_1.default.createElement(Box_1.default, { className: "app-container" }, react_1.default.createElement(ConferenceContainer_1.default, { mode: mode }))) : react_1.default.createElement(react_1.default.Fragment, null, "Initializing Livo...")));
};
exports.App = App;