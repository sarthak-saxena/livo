"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Box_1 = __importDefault(require("./ui/Box"));
var VideoStream = function () {
    return react_1.default.createElement(Box_1.default, { className: "card" }, react_1.default.createElement(Box_1.default, { className: "content" }, "Test"));
};
exports.default = VideoStream;