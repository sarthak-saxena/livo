"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var VideoStream_1 = __importDefault(require("../components/VideoStream"));
var core_1 = require("@material-ui/core");
var useStyles = core_1.makeStyles(function (theme) {
    return {
        root: {
            padding: 20
        }
    };
});
var VideoStreamContainer = function () {
    var classes = useStyles();
    return react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, className: classes.root }, react_1.default.createElement(Grid_1.default, { item: true, lg: 3, md: 3, sm: 6, xs: 12 }, react_1.default.createElement(VideoStream_1.default, null)), react_1.default.createElement(Grid_1.default, { item: true, lg: 3, md: 3, sm: 6, xs: 12 }, react_1.default.createElement(VideoStream_1.default, null)), react_1.default.createElement(Grid_1.default, { item: true, lg: 3, md: 3, sm: 6, xs: 12 }, react_1.default.createElement(VideoStream_1.default, null)), react_1.default.createElement(Grid_1.default, { item: true, lg: 3, md: 3, sm: 6, xs: 12 }, react_1.default.createElement(VideoStream_1.default, null)));
};
exports.default = VideoStreamContainer;