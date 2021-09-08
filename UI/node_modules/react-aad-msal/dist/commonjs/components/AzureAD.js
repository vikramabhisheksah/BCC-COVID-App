"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AzureAD = void 0;

var _react = require("react");

var _enums = require("../enums");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AzureAD = function AzureAD(props) {
  var authenticatedFunction = props.authenticatedFunction,
      unauthenticatedFunction = props.unauthenticatedFunction,
      provider = props.provider,
      forceLogin = props.forceLogin,
      accountInfoCallback = props.accountInfoCallback;

  var _useState = (0, _react.useState)(provider.getAccountInfo()),
      _useState2 = _slicedToArray(_useState, 2),
      accountInfo = _useState2[0],
      _setAccountInfo = _useState2[1];

  var _useState3 = (0, _react.useState)(provider.authenticationState),
      _useState4 = _slicedToArray(_useState3, 2),
      authenticationState = _useState4[0],
      _setAuthenticationState = _useState4[1];

  var _useState5 = (0, _react.useState)(provider.getError()),
      _useState6 = _slicedToArray(_useState5, 2),
      error = _useState6[0],
      _setError = _useState6[1];

  (0, _react.useEffect)(function () {
    provider.registerAuthenticationStateHandler(setAuthenticationState);
    provider.registerAcountInfoHandler(onAccountInfoChanged);
    provider.registerErrorHandler(setError);

    if (props.reduxStore) {
      provider.registerReduxStore(props.reduxStore);
    }

    if (forceLogin && authenticationState === _enums.AuthenticationState.Unauthenticated && !error) {
      login();
    }

    return function () {
      provider.unregisterAuthenticationStateHandler(setAuthenticationState);
      provider.unregisterAccountInfoHandler(onAccountInfoChanged);
      provider.unregisterErrorHandler(setError);
    };
  }, [authenticationState, accountInfo, error]);
  var login = (0, _react.useCallback)(function () {
    provider.login();
  }, [provider]);
  var logout = (0, _react.useCallback)(function () {
    if (authenticationState !== _enums.AuthenticationState.Authenticated) {
      return;
    }

    provider.logout();
  }, [authenticationState, provider]);
  var setAuthenticationState = (0, _react.useCallback)(function (newState) {
    if (newState !== authenticationState) {
      _setAuthenticationState(newState);

      if (newState === _enums.AuthenticationState.Unauthenticated && forceLogin && !error) {
        login();
      }
    }
  }, [authenticationState, forceLogin, error]);
  var setError = (0, _react.useCallback)(function (newError) {
    if (newError !== error) {
      _setError(newError);
    }
  }, [error]);
  var onAccountInfoChanged = (0, _react.useCallback)(function (newAccountInfo) {
    _setAccountInfo(newAccountInfo);

    if (accountInfoCallback) {
      console.warn('Warning! The accountInfoCallback callback has been deprecated and will be removed in a future release.');
      accountInfoCallback(newAccountInfo);
    }
  }, [accountInfoCallback]);
  var childrenFunctionProps = (0, _react.useMemo)(function () {
    return {
      accountInfo: accountInfo,
      authenticationState: authenticationState,
      error: error,
      login: login,
      logout: logout
    };
  }, [accountInfo, authenticationState, error, login, logout]);

  function getChildrenOrFunction(children, childrenProps) {
    if (children) {
      if (isChildrenFunction(children)) {
        return children(childrenProps);
      } else {
        return children;
      }
    } else {
      return null;
    }
  }

  function isChildrenFunction(children) {
    return typeof children == 'function' || false;
  }

  switch (authenticationState) {
    case _enums.AuthenticationState.Authenticated:
      if (authenticatedFunction) {
        var authFunctionResult = authenticatedFunction(logout);
        console.warn('Warning! The authenticatedFunction callback has been deprecated and will be removed in a future release.');

        if (authFunctionResult) {
          return authFunctionResult;
        }
      }

      return getChildrenOrFunction(props.children, childrenFunctionProps);

    case _enums.AuthenticationState.Unauthenticated:
      if (unauthenticatedFunction) {
        console.warn('Warning! The unauthenticatedFunction callback has been deprecated and will be removed in a future release.');
        return unauthenticatedFunction(login) || null;
      }

    case _enums.AuthenticationState.InProgress:
      if (isChildrenFunction(props.children)) {
        return getChildrenOrFunction(props.children, childrenFunctionProps);
      }

      return null;

    default:
      return null;
  }
};

exports.AzureAD = AzureAD;
AzureAD.displayName = 'AzureAD';
//# sourceMappingURL=AzureAD.js.map