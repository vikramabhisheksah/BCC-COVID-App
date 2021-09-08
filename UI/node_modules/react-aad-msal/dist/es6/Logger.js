var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.VERBOSE = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        // eslint-disable-next-line no-console
        console.log.apply(console, ['[VERBOSE] ' + message].concat(optionalParams));
    };
    Logger.INFO = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        // eslint-disable-next-line no-console
        console.info.apply(console, ['[INFO] ' + message].concat(optionalParams));
    };
    Logger.WARN = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        // eslint-disable-next-line no-console
        console.warn.apply(console, ['[WARN] ' + message].concat(optionalParams));
    };
    Logger.ERROR = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        // eslint-disable-next-line no-console
        console.error.apply(console, ['[ERROR] ' + message].concat(optionalParams));
    };
    return Logger;
}());
export { Logger };
//# sourceMappingURL=Logger.js.map