"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IAccountInfo = require("./IAccountInfo");

Object.keys(_IAccountInfo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IAccountInfo[key];
    }
  });
});

var _IAuthProvider = require("./IAuthProvider");

Object.keys(_IAuthProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IAuthProvider[key];
    }
  });
});

var _IMsalAuthProviderConfig = require("./IMsalAuthProviderConfig");

Object.keys(_IMsalAuthProviderConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IMsalAuthProviderConfig[key];
    }
  });
});
//# sourceMappingURL=index.js.map