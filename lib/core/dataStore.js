"use strict";

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
var Voxeet_1 = require("../types/Voxeet");
var sdk_1 = require("./voxeet/sdk");
var callbackEventListener_1 = __importDefault(require("./callbackEventListener"));
var DataStore = function () {
    function DataStore() {
        var _this = this;
        this.data = {};
        this.dataSyncCallback = new callbackEventListener_1.default();
        this.getData = function () {
            return _this.data;
        };
        this.requestData = function () {
            var participantId = sdk_1.getVoxeetSessionParticipantId();
            sdk_1.requestDataSync(participantId);
            return new Promise(function (resolve) {
                _this.dataSyncCallback.on(Voxeet_1.VoxeetCommandType.ResponseDataSync, function (data) {
                    resolve(data);
                });
            });
        };
        this.synchronise = function (conference) {
            return __awaiter(_this, void 0, void 0, function () {
                var data, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(conference.participants.size > 1)) return [3, 5];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3,, 4]);
                            return [4, this.requestData()];
                        case 2:
                            data = _a.sent();
                            this.setData(data);
                            return [3, 4];
                        case 3:
                            e_1 = _a.sent();
                            console.error("Error in synchronising data");
                            this.setData({});
                            return [3, 4];
                        case 4:
                            return [3, 6];
                        case 5:
                            this.setData({});
                            _a.label = 6;
                        case 6:
                            return [2, this.data];
                    }
                });
            });
        };
    }
    DataStore.prototype.update = function (command, attendeeId) {
        if (!this.data[attendeeId]) {
            this.data[attendeeId] = {};
        }
        switch (command) {
            case Voxeet_1.VoxeetCommandType.GrantSpeakerAccess:
                this.data[attendeeId].speaker = true;
                break;
            case Voxeet_1.VoxeetCommandType.RevokeSpeakerAccess:
                this.data[attendeeId].speaker = false;
                break;
            case Voxeet_1.VoxeetCommandType.RaiseHand:
                this.data[attendeeId].handRaised = true;
                break;
            case Voxeet_1.VoxeetCommandType.unRaiseHand:
                this.data[attendeeId].handRaised = false;
                break;
            case Voxeet_1.VoxeetCommandType.MuteAttendee:
                this.data[attendeeId].mute = true;
                break;
            case Voxeet_1.VoxeetCommandType.UnMuteAttendee:
                this.data[attendeeId].mute = false;
                break;
        }
    };
    DataStore.prototype.setData = function (data) {
        this.data = data;
    };
    return DataStore;
}();
exports.default = DataStore;