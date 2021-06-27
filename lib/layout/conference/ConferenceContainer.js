"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Conference_1 = __importDefault(require("./Conference"));
var ConferenceContainer = function (_a) {
    var mode = _a.mode;
    return react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(Conference_1.default, null));
};
exports.default = ConferenceContainer;