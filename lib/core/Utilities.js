"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getShortHandName = exports.isCreator = void 0;
var isCreator = function (attendee) {
    return attendee.info.name.includes("admin");
};
exports.isCreator = isCreator;
var getShortHandName = function (name) {
    var array = name.split(" ");
    return "" + array[0][0] + (array[1] ? array[1][0] : "");
};
exports.getShortHandName = getShortHandName;