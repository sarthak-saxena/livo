"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Card_1 = __importDefault(require("@material-ui/core/Card"));
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var VideoStream = function () {
    return react_1.default.createElement(Card_1.default, null, react_1.default.createElement(core_1.CardContent, null, "Test"));
};
exports.default = VideoStream;