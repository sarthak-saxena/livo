"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
var App_1 = require("./types/App");
var config_1 = require("./testConfig/config");
var App_2 = require("./App");
react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null, react_1.default.createElement(App_2.App, { voxeetConfig: {
        consumerKey: "nw5wqOFjDuzrHbTsQXJj6Q==",
        consumerSecret: "u1dXQWADNBbQ44jdg4Skl_Jc3Xw82JGDEDq6zGBTxc0="
    }, attendee: config_1.SampleAttendee, room: config_1.SampleRoom, mode: App_1.ConferenceMode.AudioConference })), document.getElementById("root"));
reportWebVitals_1.default();