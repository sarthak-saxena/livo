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
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = this && this.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function () {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0:case 1:
                    t = op;break;
                case 4:
                    _.label++;return { value: op[1], done: false };
                case 5:
                    _.label++;y = op[1];op = [0];continue;
                case 7:
                    op = _.ops.pop();_.trys.pop();continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];t = op;break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];_.ops.push(op);break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        _this.synchronizeData = function () {};
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
                _this.setState({ conference: conference }, function () {
                    var participants = sdk_1.getVoxeetSessionParticipants();
                    if (participants.length <= 1) {
                        _this.setState({ syncedData: {} });
                    } else {
                        exports.dataStore.synchronise(conference).then(function (syncedData) {
                            _this.setState({ syncedData: syncedData });
                        }).catch(function (error) {
                            alert(error);
                        });
                    }
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
    App.prototype.invokePurgeSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4, sdk_1.purgeVoxeetConference()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    App.prototype.componentWillMount = function () {
        this.initConference();
    };
    App.prototype.componentWillUnmount = function () {
        if (!this.props.disablePurgeOnRemount) {
            this.invokePurgeSession();
        }
        this.props.onPurgeComplete();
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
        return react_1.default.createElement(theming_1.ThemeProvider, { theme: theme }, react_1.default.createElement(userContext_1.UserContext.Provider, { value: { attendee: attendee, onAttendeeAdd: onAttendeeAdd, onCallDisconnectCallback: onCallDisconnectCallback, mode: mode } }, conference && syncedData ? react_1.default.createElement(voxeetContext_1.VoxeetContext.Provider, { value: { conference: conference } }, react_1.default.createElement(dataSyncContext_1.DataSyncContext.Provider, { value: syncedData }, react_1.default.createElement(Box_1.default, { className: exports.LivoAppContainer }, react_1.default.createElement(ConferenceContainer_1.default, null)))) : react_1.default.createElement(Box_1.default, null, (!conference ? "Initializing Livo" : !syncedData ? "Synchronising state" : "") + "...")));
    };
    return App;
}(react_1.default.Component);
exports.App = App;