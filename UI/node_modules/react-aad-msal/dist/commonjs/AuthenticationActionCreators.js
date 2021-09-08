"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationActionCreators = void 0;

var _enums = require("./enums");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AuthenticationActionCreators = function AuthenticationActionCreators() {
  _classCallCheck(this, AuthenticationActionCreators);
};

exports.AuthenticationActionCreators = AuthenticationActionCreators;

_defineProperty(AuthenticationActionCreators, "initializing", function () {
  return {
    type: _enums.AuthenticationActions.Initializing
  };
});

_defineProperty(AuthenticationActionCreators, "initialized", function () {
  return {
    type: _enums.AuthenticationActions.Initialized
  };
});

_defineProperty(AuthenticationActionCreators, "loginSuccessful", function (data) {
  return {
    payload: data,
    type: _enums.AuthenticationActions.LoginSuccess
  };
});

_defineProperty(AuthenticationActionCreators, "loginFailed", function () {
  return {
    type: _enums.AuthenticationActions.LoginFailed
  };
});

_defineProperty(AuthenticationActionCreators, "loginError", function (error) {
  return {
    payload: error,
    type: _enums.AuthenticationActions.LoginError
  };
});

_defineProperty(AuthenticationActionCreators, "clearError", function () {
  return {
    type: _enums.AuthenticationActions.ClearError
  };
});

_defineProperty(AuthenticationActionCreators, "logoutSuccessful", function () {
  return {
    type: _enums.AuthenticationActions.LogoutSuccess
  };
});

_defineProperty(AuthenticationActionCreators, "acquireIdTokenSuccess", function (token) {
  return {
    payload: token,
    type: _enums.AuthenticationActions.AcquiredIdTokenSuccess
  };
});

_defineProperty(AuthenticationActionCreators, "acquireIdTokenError", function (error) {
  return {
    payload: error,
    type: _enums.AuthenticationActions.AcquiredIdTokenError
  };
});

_defineProperty(AuthenticationActionCreators, "acquireAccessTokenSuccess", function (token) {
  return {
    payload: token,
    type: _enums.AuthenticationActions.AcquiredAccessTokenSuccess
  };
});

_defineProperty(AuthenticationActionCreators, "acquireAccessTokenError", function (error) {
  return {
    payload: error,
    type: _enums.AuthenticationActions.AcquiredAccessTokenError
  };
});

_defineProperty(AuthenticationActionCreators, "authenticatedStateChanged", function (state) {
  return {
    payload: state,
    type: _enums.AuthenticationActions.AuthenticatedStateChanged
  };
});
//# sourceMappingURL=AuthenticationActionCreators.js.map