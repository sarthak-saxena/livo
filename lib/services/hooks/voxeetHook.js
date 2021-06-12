"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVoxeetStreamAdded = exports.useVoxeet = void 0;
var react_1 = require("react");
var voxeetContext_1 = require("../context/voxeetContext");
var Voxeet_1 = require("../../types/Voxeet");
var voxeet_web_sdk_1 = __importDefault(require("@voxeet/voxeet-web-sdk"));
var conference = voxeet_web_sdk_1.default.conference;
var useVoxeet = function () {
    return react_1.useContext(voxeetContext_1.VoxeetContext);
};
exports.useVoxeet = useVoxeet;
var useVoxeetStreamAdded = function (callback) {
    react_1.useEffect(function () {
        var streamAddListener = function (participant, stream) {
            callback(participant, stream, Voxeet_1.VoxeetConferenceEvents.StreamAdded);
        };
        var streamRemoveListener = function (participant, stream) {
            callback(participant, stream, Voxeet_1.VoxeetConferenceEvents.StreamRemoved);
        };
        conference.on(Voxeet_1.VoxeetConferenceEvents.StreamAdded, streamAddListener);
        conference.on(Voxeet_1.VoxeetConferenceEvents.StreamRemoved, streamRemoveListener);
        return function cleanup() {
            conference.off(Voxeet_1.VoxeetConferenceEvents.StreamAdded, streamAddListener);
            conference.off(Voxeet_1.VoxeetConferenceEvents.StreamRemoved, streamRemoveListener);
        };
    }, [callback]);
};
exports.useVoxeetStreamAdded = useVoxeetStreamAdded;