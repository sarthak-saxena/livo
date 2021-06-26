"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleAttendee = exports.SampleUsers = exports.SampleRoom = void 0;
var randomId = Math.floor(Math.random() * 1000).toString();
exports.SampleRoom = {
    name: "Sample Channel",
    id: "57a26845-a7c8-4dee-9041-efd39d81139f"
};
exports.SampleUsers = [{
    name: "Harish",
    id: "c83ef97b-6f2e-4946-b79a-163f5fec7e9d"
}, {
    name: "Soni",
    id: "c83ef97b-6f2e-4946-b79a-163f5fec7e9d"
}];
exports.SampleAttendee = {
    name: "User " + randomId,
    id: randomId
};