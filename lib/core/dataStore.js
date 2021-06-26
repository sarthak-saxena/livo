"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Voxeet_1 = require("../types/Voxeet");
var DataStore = function () {
    function DataStore() {
        var _this = this;
        this.data = {};
        this.getData = function () {
            return _this.data;
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
    return DataStore;
}();
exports.default = DataStore;