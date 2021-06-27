"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.useDataSync = void 0;
var react_1 = require("react");
var dataSyncContext_1 = require("../context/dataSyncContext");
var useDataSync = function () {
    return react_1.useContext(dataSyncContext_1.DataSyncContext);
};
exports.useDataSync = useDataSync;