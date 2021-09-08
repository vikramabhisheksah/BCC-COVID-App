"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationActions = void 0;
var AuthenticationActions;
exports.AuthenticationActions = AuthenticationActions;

(function (AuthenticationActions) {
  AuthenticationActions["Initializing"] = "AAD_INITIALIZING";
  AuthenticationActions["Initialized"] = "AAD_INITIALIZED";
  AuthenticationActions["LoginSuccess"] = "AAD_LOGIN_SUCCESS";
  AuthenticationActions["LoginFailed"] = "AAD_LOGIN_FAILED";
  AuthenticationActions["LoginError"] = "AAD_LOGIN_ERROR";
  AuthenticationActions["ClearError"] = "AAD_CLEAR_ERROR";
  AuthenticationActions["LogoutSuccess"] = "AAD_LOGOUT_SUCCESS";
  AuthenticationActions["AcquiredIdTokenSuccess"] = "AAD_ACQUIRED_ID_TOKEN_SUCCESS";
  AuthenticationActions["AcquiredIdTokenError"] = "AAD_ACQUIRED_ID_TOKEN_ERROR";
  AuthenticationActions["AcquiredAccessTokenSuccess"] = "AAD_ACQUIRED_ACCESS_TOKEN_SUCCESS";
  AuthenticationActions["AcquiredAccessTokenError"] = "AAD_ACQUIRED_ACCESS_TOKEN_ERROR";
  AuthenticationActions["AuthenticatedStateChanged"] = "AAD_AUTHENTICATED_STATE_CHANGED";
})(AuthenticationActions || (exports.AuthenticationActions = AuthenticationActions = {}));
//# sourceMappingURL=AuthenticationActions.js.map