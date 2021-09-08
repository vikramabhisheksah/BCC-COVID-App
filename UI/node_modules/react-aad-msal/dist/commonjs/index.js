"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  IAccountInfo: true,
  IMsalAuthProviderConfig: true,
  AuthenticationActions: true,
  AuthenticationState: true,
  LoginType: true,
  AccessTokenResponse: true,
  IdTokenResponse: true,
  MsalAuthProvider: true,
  AuthenticationActionCreators: true,
  withAuthentication: true
};
Object.defineProperty(exports, "IAccountInfo", {
  enumerable: true,
  get: function get() {
    return _interfaces.IAccountInfo;
  }
});
Object.defineProperty(exports, "IMsalAuthProviderConfig", {
  enumerable: true,
  get: function get() {
    return _interfaces.IMsalAuthProviderConfig;
  }
});
Object.defineProperty(exports, "AuthenticationActions", {
  enumerable: true,
  get: function get() {
    return _enums.AuthenticationActions;
  }
});
Object.defineProperty(exports, "AuthenticationState", {
  enumerable: true,
  get: function get() {
    return _enums.AuthenticationState;
  }
});
Object.defineProperty(exports, "LoginType", {
  enumerable: true,
  get: function get() {
    return _enums.LoginType;
  }
});
Object.defineProperty(exports, "AccessTokenResponse", {
  enumerable: true,
  get: function get() {
    return _AccessTokenResponse.AccessTokenResponse;
  }
});
Object.defineProperty(exports, "IdTokenResponse", {
  enumerable: true,
  get: function get() {
    return _IdTokenResponse.IdTokenResponse;
  }
});
Object.defineProperty(exports, "MsalAuthProvider", {
  enumerable: true,
  get: function get() {
    return _MsalAuthProvider.MsalAuthProvider;
  }
});
Object.defineProperty(exports, "AuthenticationActionCreators", {
  enumerable: true,
  get: function get() {
    return _AuthenticationActionCreators.AuthenticationActionCreators;
  }
});
Object.defineProperty(exports, "withAuthentication", {
  enumerable: true,
  get: function get() {
    return _withAuthentication.withAuthentication;
  }
});
exports["default"] = void 0;

var _interfaces = require("./interfaces");

var _enums = require("./enums");

var _AccessTokenResponse = require("./AccessTokenResponse");

var _IdTokenResponse = require("./IdTokenResponse");

var _MsalAuthProvider = require("./MsalAuthProvider");

var _AuthenticationActionCreators = require("./AuthenticationActionCreators");

var _AzureAD = require("./components/AzureAD");

Object.keys(_AzureAD).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AzureAD[key];
    }
  });
});

var _withAuthentication = require("./components/withAuthentication");

var _default = _AzureAD.AzureAD;
exports["default"] = _default;
//# sourceMappingURL=index.js.map