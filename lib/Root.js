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
exports.Root = void 0;
var react_1 = __importDefault(require("react"));
var config_1 = require("./testConfig/config");
var App_1 = require("./App");
var Button_1 = __importDefault(require("./components/ui/Button"));
var sdk_1 = require("./core/voxeet/sdk");
var url = new URL(window.location);
var attendee = __assign(__assign({}, config_1.SampleAttendee), { isConferenceCreator: Boolean(url.searchParams.get("creator")), name: url.searchParams.get("id") ? "User " + url.searchParams.get("id") : config_1.SampleAttendee.name, id: url.searchParams.get("id") || config_1.SampleAttendee.id });
var Root = function (_super) {
    __extends(Root, _super);
    function Root() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            visible: true
        };
        _this.remount = function () {
            _this.setState({ visible: false }, function () {
                setTimeout(function () {
                    _this.setState({ visible: true });
                }, 1000);
            });
        };
        return _this;
    }
    Root.prototype.componentWillMount = function () {
        sdk_1.purgeVoxeetConference();
    };
    Root.prototype.render = function () {
        return react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(Button_1.default, { onClick: this.remount }, " Remount "), this.state.visible && react_1.default.createElement(App_1.App, { apiConfig: {
                consumerKey: "nw5wqOFjDuzrHbTsQXJj6Q==",
                consumerSecret: "u1dXQWADNBbQ44jdg4Skl_Jc3Xw82JGDEDq6zGBTxc0="
            }, attendee: attendee, room: config_1.SampleRoom, disablePurgeOnRemount: true }));
    };
    return Root;
}(react_1.default.Component);
exports.Root = Root;