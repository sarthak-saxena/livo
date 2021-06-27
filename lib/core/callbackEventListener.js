"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("../App");
var CallbackEventListener = function () {
    function CallbackEventListener(updateDataStore) {
        var _this = this;
        this.listeners = {};
        this.updateDataStore = false;
        this.on = function (eventListenerName, listener) {
            if (!_this.listeners[eventListenerName]) {
                _this.listeners[eventListenerName] = [];
            }
            _this.listeners[eventListenerName].push(listener);
        };
        this.call = function (eventListenerName, params) {
            if (_this.listeners[eventListenerName]) {
                _this.listeners[eventListenerName].forEach(function (cb) {
                    return cb(params);
                });
                if (_this.updateDataStore) {
                    App_1.dataStore.update(eventListenerName, params);
                }
            }
        };
        this.updateDataStore = updateDataStore;
    }
    return CallbackEventListener;
}();
exports.default = CallbackEventListener;