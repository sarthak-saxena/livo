"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.LivoAppContainer = exports.dataStore = void 0;
var react_1 = __importDefault(require("react"));
var sdk_1 = require("./core/voxeet/sdk");
var ConferenceContainer_1 = __importDefault(require("./layout/conference/ConferenceContainer"));
var voxeetContext_1 = require("./services/context/voxeetContext");
var userContext_1 = require("./services/context/userContext");
var theming_1 = require("theming");
require("./styles/index.sass");
var Box_1 = __importDefault(require("./components/ui/Box"));
var dataStore_1 = __importDefault(require("./core/dataStore"));
var dataSyncContext_1 = require("./services/context/dataSyncContext");
exports.dataStore = new dataStore_1.default();
var theme = {
    color: "black",
    background: "white"
};
exports.LivoAppContainer = "livo-app-container";
var maxRetryCount = 3;
var retryInterval = 500;
var App = function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            conference: undefined,
            syncedData: undefined
        };
        _this.retryCount = 0;
        return _this;
    }
    App.prototype.initConference = function () {
        var _this = this;
        var _a = this.props,
            apiConfig = _a.apiConfig,
            attendee = _a.attendee,
            room = _a.room,
            onAppInitializedSuccessCallback = _a.onAppInitializedSuccessCallback,
            onAppInitializedErrorCallback = _a.onAppInitializedErrorCallback;
        sdk_1.initializeVoxeet(apiConfig, attendee, room).then(function (conference) {
            if (conference) {
                _this.setState({ conference: conference });
                exports.dataStore.synchronise(conference).then(function (syncedData) {
                    _this.setState({ syncedData: syncedData });
                });
                onAppInitializedSuccessCallback && onAppInitializedSuccessCallback(conference);
            }
        }).catch(function (error) {
            if (_this.retryCount <= 3) {
                setTimeout(function () {
                    _this.initConference();
                    _this.retryCount++;
                }, retryInterval);
            } else {
                alert(error);
                onAppInitializedErrorCallback && onAppInitializedErrorCallback(error);
            }
        });
    };
    App.prototype.componentWillMount = function () {
        this.initConference();
    };
    App.prototype.componentWillUnmount = function () {
        sdk_1.purgeVoxeetConference(this.props.onPurgeComplete);
    };
    App.prototype.render = function () {
        var _a = this.props,
            attendee = _a.attendee,
            onAttendeeAdd = _a.onAttendeeAdd,
            onCallDisconnectCallback = _a.onCallDisconnectCallback,
            mode = _a.mode;
        var _b = this.state,
            conference = _b.conference,
            syncedData = _b.syncedData;
        return react_1.default.createElement(theming_1.ThemeProvider, { theme: theme }, react_1.default.createElement(userContext_1.UserContext.Provider, { value: { attendee: attendee, onAttendeeAdd: onAttendeeAdd, onCallDisconnectCallback: onCallDisconnectCallback } }, conference && syncedData ? react_1.default.createElement(voxeetContext_1.VoxeetContext.Provider, { value: { conference: conference } }, react_1.default.createElement(dataSyncContext_1.DataSyncContext.Provider, { value: syncedData }, react_1.default.createElement(Box_1.default, { className: exports.LivoAppContainer }, react_1.default.createElement(ConferenceContainer_1.default, { mode: mode })))) : react_1.default.createElement(Box_1.default, null, (!conference ? "Initializing Livo" : !syncedData ? "Synchronising state" : "") + "...")));
    };
    return App;
}(react_1.default.Component);
exports.App = App;