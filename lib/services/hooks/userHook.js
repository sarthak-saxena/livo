"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.useAttendee = void 0;
var react_1 = require("react");
var userContext_1 = require("../context/userContext");
var useAttendee = function () {
    return react_1.useContext(userContext_1.UserContext);
};
exports.useAttendee = useAttendee;