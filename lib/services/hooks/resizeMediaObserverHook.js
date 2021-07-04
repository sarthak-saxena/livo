"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResizeMediaObserver = exports.useOnResizeMediaCallback = void 0;
var react_1 = require("react");
var App_1 = require("../../App");
var callbackEventListener_1 = __importDefault(require("../../core/callbackEventListener"));
var ResizeMediaCallback = "ResizeMediaCallback";
var lastInlineSizeSmall = false;
var observerInitialized = false;
var callbackEventListener = new callbackEventListener_1.default();
var initResizeObserver = function () {
    if (!observerInitialized) {
        var element = document.getElementsByClassName(App_1.LivoAppContainer)[0];
        var resizeObserver = new ResizeObserver(function (entries) {
            if (entries[0] && entries[0].contentBoxSize[0]) {
                var height = entries[0].contentBoxSize[0].blockSize;
                var width = entries[0].contentBoxSize[0].inlineSize;
                if (width < 500 && !lastInlineSizeSmall) {
                    callbackEventListener.call(ResizeMediaCallback, width);
                    lastInlineSizeSmall = true;
                } else if (width > 500 && lastInlineSizeSmall) {
                    callbackEventListener.call(ResizeMediaCallback, width);
                    lastInlineSizeSmall = false;
                }
            }
        });
        resizeObserver.observe(element);
    }
    observerInitialized = true;
};
var useOnResizeMediaCallback = function (setSmallScreen) {
    return react_1.useCallback(function (inlineWidth) {
        if (inlineWidth < 500) {
            setSmallScreen(true);
        } else {
            setSmallScreen(false);
        }
    }, [setSmallScreen]);
};
exports.useOnResizeMediaCallback = useOnResizeMediaCallback;
var useResizeMediaObserver = function (callback) {
    react_1.useEffect(function () {
        initResizeObserver();
        callbackEventListener.on(ResizeMediaCallback, callback);
    }, []);
};
exports.useResizeMediaObserver = useResizeMediaObserver;