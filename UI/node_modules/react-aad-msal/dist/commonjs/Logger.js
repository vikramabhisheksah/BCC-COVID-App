"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Logger = function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, null, [{
    key: "VERBOSE",
    value: function VERBOSE(message) {
      var _console;

      for (var _len = arguments.length, optionalParams = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        optionalParams[_key - 1] = arguments[_key];
      }

      (_console = console).log.apply(_console, _toConsumableArray(['[VERBOSE] ' + message].concat(optionalParams)));
    }
  }, {
    key: "INFO",
    value: function INFO(message) {
      var _console2;

      for (var _len2 = arguments.length, optionalParams = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        optionalParams[_key2 - 1] = arguments[_key2];
      }

      (_console2 = console).info.apply(_console2, _toConsumableArray(['[INFO] ' + message].concat(optionalParams)));
    }
  }, {
    key: "WARN",
    value: function WARN(message) {
      var _console3;

      for (var _len3 = arguments.length, optionalParams = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        optionalParams[_key3 - 1] = arguments[_key3];
      }

      (_console3 = console).warn.apply(_console3, _toConsumableArray(['[WARN] ' + message].concat(optionalParams)));
    }
  }, {
    key: "ERROR",
    value: function ERROR(message) {
      var _console4;

      for (var _len4 = arguments.length, optionalParams = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        optionalParams[_key4 - 1] = arguments[_key4];
      }

      (_console4 = console).error.apply(_console4, _toConsumableArray(['[ERROR] ' + message].concat(optionalParams)));
    }
  }]);

  return Logger;
}();

exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map