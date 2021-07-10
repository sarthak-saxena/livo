"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
var Root_1 = require("./Root");
react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null, react_1.default.createElement(Root_1.Root, null)), document.getElementById("root"));
reportWebVitals_1.default();