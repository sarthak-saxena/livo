"use strict";

var __assign = this && this.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var url = new URL(window.location);
var attendee = __assign(__assign({}, config_1.SampleAttendee), { isConferenceCreator: Boolean(url.searchParams.get("creator")) });
react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null, react_1.default.createElement(App_2.App, { apiConfig: {
        consumerKey: "nw5wqOFjDuzrHbTsQXJj6Q==",
        consumerSecret: "u1dXQWADNBbQ44jdg4Skl_Jc3Xw82JGDEDq6zGBTxc0="
    }, attendee: attendee, room: config_1.SampleRoom, mode: App_1.ConferenceMode.AudioConference })), document.getElementById("root"));
reportWebVitals_1.default();