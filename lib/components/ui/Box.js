"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clsx_1 = __importDefault(require("clsx"));
var react_1 = __importDefault(require("react"));
var Box = function (_a) {
    var children = _a.children,
        className = _a.className,
        onClick = _a.onClick;
    return react_1.default.createElement("div", { onClick: onClick, className: clsx_1.default(className) }, children);
};
exports.default = Box;