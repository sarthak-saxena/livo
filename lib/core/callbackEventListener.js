"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CallbackEventListener = function () {
    function CallbackEventListener(props) {
        var _this = this;
        this.listeners = {};
        this.on = function (eventListenerName, listener) {
            if (!_this.listeners[eventListenerName]) {
                _this.listeners[eventListenerName] = [];
            }
            _this.listeners[eventListenerName].push(listener);
        };
        this.call = function (eventListenerName, params) {
            _this.listeners[eventListenerName] && _this.listeners[eventListenerName].forEach(function (cb) {
                return cb(params);
            });
        };
    }
    return CallbackEventListener;
}();
exports.default = CallbackEventListener;