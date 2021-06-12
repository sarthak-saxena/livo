"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var AvatarContainer_1 = __importDefault(require("../AvatarContainer"));
var Callpad_1 = __importDefault(require("../../components/Callpad"));
var Conference = function () {
    return react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(AvatarContainer_1.default, null), react_1.default.createElement(Callpad_1.default, null));
};
exports.default = Conference;