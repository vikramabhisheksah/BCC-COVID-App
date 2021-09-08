"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MsalAuthProvider = void 0;

var _msal = require("msal");

var _AccessTokenResponse = require("./AccessTokenResponse");

var _AuthenticationActionCreators = require("./AuthenticationActionCreators");

var _IdTokenResponse = require("./IdTokenResponse");

var _Logger = require("./Logger");

var _enums = require("./enums");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MsalAuthProvider = function (_UserAgentApplication) {
  _inherits(MsalAuthProvider, _UserAgentApplication);

  function MsalAuthProvider(_config, _parameters) {
    var _this;

    var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      loginType: _enums.LoginType.Popup,
      tokenRefreshUri: window.location.origin
    };

    _classCallCheck(this, MsalAuthProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MsalAuthProvider).call(this, _config));

    _defineProperty(_assertThisInitialized(_this), "authenticationState", void 0);

    _defineProperty(_assertThisInitialized(_this), "UserAgentApplication", void 0);

    _defineProperty(_assertThisInitialized(_this), "_reduxStore", void 0);

    _defineProperty(_assertThisInitialized(_this), "_parameters", void 0);

    _defineProperty(_assertThisInitialized(_this), "_options", void 0);

    _defineProperty(_assertThisInitialized(_this), "_accountInfo", void 0);

    _defineProperty(_assertThisInitialized(_this), "_error", void 0);

    _defineProperty(_assertThisInitialized(_this), "_onAuthenticationStateHandlers", new Set());

    _defineProperty(_assertThisInitialized(_this), "_onAccountInfoHandlers", new Set());

    _defineProperty(_assertThisInitialized(_this), "_onErrorHandlers", new Set());

    _defineProperty(_assertThisInitialized(_this), "_actionQueue", []);

    _defineProperty(_assertThisInitialized(_this), "login", function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(parameters) {
        var params, error, providerOptions;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = parameters || _this.getAuthenticationParameters();
                error = _this.getError();

                if (error && error.errorCode !== 'block_token_requests') {
                  _this.setError(null);
                }

                providerOptions = _this.getProviderOptions();

                if (!(providerOptions.loginType === _enums.LoginType.Redirect)) {
                  _context.next = 9;
                  break;
                }

                _this.setAuthenticationState(_enums.AuthenticationState.InProgress);

                try {
                  _this.loginRedirect(params);
                } catch (error) {
                  _Logger.Logger.ERROR(error);

                  _this.setError(error);

                  _this.setAuthenticationState(_enums.AuthenticationState.Unauthenticated);
                }

                _context.next = 23;
                break;

              case 9:
                if (!(providerOptions.loginType === _enums.LoginType.Popup)) {
                  _context.next = 23;
                  break;
                }

                _context.prev = 10;

                _this.setAuthenticationState(_enums.AuthenticationState.InProgress);

                _context.next = 14;
                return _this.loginPopup(params);

              case 14:
                _context.next = 21;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](10);

                _Logger.Logger.ERROR(_context.t0);

                _this.setError(_context.t0);

                _this.setAuthenticationState(_enums.AuthenticationState.Unauthenticated);

              case 21:
                _context.next = 23;
                return _this.processLogin();

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[10, 16]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "logout", function () {
      _get(_getPrototypeOf(MsalAuthProvider.prototype), "logout", _assertThisInitialized(_this)).call(_assertThisInitialized(_this));

      _this.dispatchAction(_AuthenticationActionCreators.AuthenticationActionCreators.logoutSuccessful());
    });

    _defineProperty(_assertThisInitialized(_this), "getAccountInfo", function () {
      return _this._accountInfo ? _objectSpread({}, _this._accountInfo) : null;
    });

    _defineProperty(_assertThisInitialized(_this), "getAccessToken", function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(parameters) {
        var providerOptions, refreshParams, response, loginParams, _response;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                providerOptions = _this.getProviderOptions();
                refreshParams = _objectSpread({}, parameters || _this.getAuthenticationParameters(), {
                  redirectUri: parameters && parameters.redirectUri || providerOptions.tokenRefreshUri
                });

                if (refreshParams.extraQueryParameters && refreshParams.extraQueryParameters.domain_hint) {
                  delete refreshParams.extraQueryParameters.domain_hint;
                }

                _context2.prev = 3;
                _context2.next = 6;
                return _this.acquireTokenSilent(refreshParams);

              case 6:
                response = _context2.sent;

                _this.handleAcquireTokenSuccess(response);

                _this.setAuthenticationState(_enums.AuthenticationState.Authenticated);

                return _context2.abrupt("return", new _AccessTokenResponse.AccessTokenResponse(response));

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](3);
                loginParams = _objectSpread({}, parameters || _this.getAuthenticationParameters());

                _this.dispatchAction(_AuthenticationActionCreators.AuthenticationActionCreators.acquireAccessTokenError(_context2.t0));

                _context2.next = 18;
                return _this.loginToRefreshToken(_context2.t0, loginParams);

              case 18:
                _response = _context2.sent;
                return _context2.abrupt("return", new _AccessTokenResponse.AccessTokenResponse(_response));

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 12]]);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "getIdToken", function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(parameters) {
        var providerOptions, config, clientId, refreshParams, response, loginParams, account, _response2;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                providerOptions = _this.getProviderOptions();
                config = _this.getCurrentConfiguration();
                clientId = config.auth.clientId;
                refreshParams = _objectSpread({}, parameters || _this.getAuthenticationParameters(), {
                  redirectUri: parameters && parameters.redirectUri || providerOptions.tokenRefreshUri,
                  scopes: [clientId]
                });

                if (refreshParams.extraQueryParameters && refreshParams.extraQueryParameters.domain_hint) {
                  delete refreshParams.extraQueryParameters.domain_hint;
                }

                _context3.prev = 5;
                _context3.next = 8;
                return _this.acquireTokenSilent(refreshParams);

              case 8:
                response = _context3.sent;

                _this.handleAcquireTokenSuccess(response);

                _this.setAuthenticationState(_enums.AuthenticationState.Authenticated);

                return _context3.abrupt("return", new _IdTokenResponse.IdTokenResponse(response));

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](5);
                loginParams = _objectSpread({}, parameters || _this.getAuthenticationParameters());
                account = _this.getAccount();

                if (account && (!parameters || !parameters.loginHint)) {
                  loginParams.loginHint = account.userName;
                }

                _this.dispatchAction(_AuthenticationActionCreators.AuthenticationActionCreators.acquireIdTokenError(_context3.t0));

                _context3.next = 22;
                return _this.loginToRefreshToken(_context3.t0, loginParams);

              case 22:
                _response2 = _context3.sent;
                return _context3.abrupt("return", new _IdTokenResponse.IdTokenResponse(_response2));

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[5, 14]]);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "getAuthenticationParameters", function () {
      return _objectSpread({}, _this._parameters);
    });

    _defineProperty(_assertThisInitialized(_this), "getError", function () {
      return _this._error ? _objectSpread({}, _this._error) : null;
    });

    _defineProperty(_assertThisInitialized(_this), "setAuthenticationParameters", function (parameters) {
      _this._parameters = _objectSpread({}, parameters);
    });

    _defineProperty(_assertThisInitialized(_this), "getProviderOptions", function () {
      return _objectSpread({}, _this._options);
    });

    _defineProperty(_assertThisInitialized(_this), "setProviderOptions", function (options) {
      _this._options = _objectSpread({}, options);

      if (options.loginType === _enums.LoginType.Redirect) {
        _this.handleRedirectCallback(_this.authenticationRedirectCallback);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "registerReduxStore", function (store) {
      _this._reduxStore = store;

      while (_this._actionQueue.length) {
        var action = _this._actionQueue.shift();

        if (action) {
          _this.dispatchAction(action);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "registerAuthenticationStateHandler", function (listener) {
      _this._onAuthenticationStateHandlers.add(listener);

      listener(_this.authenticationState);
    });

    _defineProperty(_assertThisInitialized(_this), "unregisterAuthenticationStateHandler", function (listener) {
      _this._onAuthenticationStateHandlers["delete"](listener);
    });

    _defineProperty(_assertThisInitialized(_this), "registerAcountInfoHandler", function (listener) {
      _this._onAccountInfoHandlers.add(listener);

      listener(_this._accountInfo);
    });

    _defineProperty(_assertThisInitialized(_this), "unregisterAccountInfoHandler", function (listener) {
      _this._onAccountInfoHandlers["delete"](listener);
    });

    _defineProperty(_assertThisInitialized(_this), "registerErrorHandler", function (listener) {
      _this._onErrorHandlers.add(listener);

      listener(_this._error);
    });

    _defineProperty(_assertThisInitialized(_this), "unregisterErrorHandler", function (listener) {
      _this._onErrorHandlers["delete"](listener);
    });

    _defineProperty(_assertThisInitialized(_this), "setError", function (error) {
      _this._error = error ? _objectSpread({}, error) : null;

      if (error) {
        _this.dispatchAction(_AuthenticationActionCreators.AuthenticationActionCreators.loginError(error));
      }

      _this._onErrorHandlers.forEach(function (listener) {
        return listener(_this._error);
      });

      return _objectSpread({}, _this._error);
    });

    _defineProperty(_assertThisInitialized(_this), "loginToRefreshToken", function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(error, parameters) {
        var providerOptions, params, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                providerOptions = _this.getProviderOptions();
                params = parameters || _this.getAuthenticationParameters();

                if (!(error instanceof _msal.InteractionRequiredAuthError)) {
                  _context4.next = 23;
                  break;
                }

                if (!(providerOptions.loginType === _enums.LoginType.Redirect)) {
                  _context4.next = 6;
                  break;
                }

                _this.acquireTokenRedirect(params);

                return _context4.abrupt("return", new Promise(function (resolve) {
                  return resolve();
                }));

              case 6:
                _context4.prev = 6;
                _context4.next = 9;
                return _this.acquireTokenPopup(params);

              case 9:
                response = _context4.sent;

                _this.handleAcquireTokenSuccess(response);

                _this.setAuthenticationState(_enums.AuthenticationState.Authenticated);

                return _context4.abrupt("return", response);

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](6);

                _Logger.Logger.ERROR(_context4.t0);

                _this.setError(_context4.t0);

                _this.setAuthenticationState(_enums.AuthenticationState.Unauthenticated);

                throw _context4.t0;

              case 21:
                _context4.next = 27;
                break;

              case 23:
                _Logger.Logger.ERROR(error);

                _this.setError(error);

                _this.setAuthenticationState(_enums.AuthenticationState.Unauthenticated);

                throw error;

              case 27:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[6, 15]]);
      }));

      return function (_x4, _x5) {
        return _ref4.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "authenticationRedirectCallback", function (error) {
      if (error) {
        _this.setError(error);
      }

      _this.processLogin();
    });

    _defineProperty(_assertThisInitialized(_this), "initializeProvider", _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _this.dispatchAction(_AuthenticationActionCreators.AuthenticationActionCreators.initializing());

              _context5.next = 3;
              return _this.processLogin();

            case 3:
              _this.dispatchAction(_AuthenticationActionCreators.AuthenticationActionCreators.initialized());

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));

    _defineProperty(_assertThisInitialized(_this), "processLogin", _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!_this.getError()) {
                _context6.next = 5;
                break;
              }

              _this.handleLoginFailed();

              _this.setAuthenticationState(_enums.AuthenticationState.Unauthenticated);

              _context6.next = 19;
              break;

            case 5:
              if (!_this.getAccount()) {
                _context6.next = 18;
                break;
              }

              _context6.prev = 6;
              _context6.next = 9;
              return _this.getIdToken();

            case 9:
              _this.handleLoginSuccess();

              _context6.next = 16;
              break;

            case 12:
              _context6.prev = 12;
              _context6.t0 = _context6["catch"](6);

              if (!(_context6.t0 instanceof _msal.ClientAuthError && _context6.t0.errorCode === 'user_login_error')) {
                _Logger.Logger.ERROR(_context6.t0);

                _this.setError(_context6.t0);
              }

              _this.setAuthenticationState(_enums.AuthenticationState.Unauthenticated);

            case 16:
              _context6.next = 19;
              break;

            case 18:
              if (_this.getLoginInProgress()) {
                _this.setAuthenticationState(_enums.AuthenticationState.InProgress);
              } else {
                _this.setAuthenticationState(_enums.AuthenticationState.Unauthenticated);
              }

            case 19:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[6, 12]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "setAuthenticationState", function (state) {
      if (_this.authenticationState !== state) {
        _this.authenticationState = state;

        _this.dispatchAction(_AuthenticationActionCreators.AuthenticationActionCreators.authenticatedStateChanged(state));

        _this._onAuthenticationStateHandlers.forEach(function (listener) {
          return listener(state);
        });
      }

      return _this.authenticationState;
    });

    _defineProperty(_assertThisInitialized(_this), "setAccountInfo", function (response) {
      var accountInfo = _this.getAccountInfo() || {
        account: response.account
      };

      if (response.tokenType === _enums.TokenType.IdToken) {
        accountInfo.jwtIdToken = response.idToken.rawIdToken;
      } else if (response.tokenType === _enums.TokenType.AccessToken) {
        accountInfo.jwtAccessToken = response.accessToken;
      }

      _this._accountInfo = _objectSpread({}, accountInfo);

      _this._onAccountInfoHandlers.forEach(function (listener) {
        return listener(_this._accountInfo);
      });

      return _objectSpread({}, _this._accountInfo);
    });

    _defineProperty(_assertThisInitialized(_this), "dispatchAction", function (action) {
      if (_this._reduxStore) {
        _this._reduxStore.dispatch(action);
      } else {
        _this._actionQueue.push(action);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleAcquireTokenSuccess", function (response) {
      _this.setAccountInfo(response);

      if (response.tokenType === _enums.TokenType.IdToken) {
        var token = new _IdTokenResponse.IdTokenResponse(response);

        _this.dispatchAction(_AuthenticationActionCreators.AuthenticationActionCreators.acquireIdTokenSuccess(token));
      } else if (response.tokenType === _enums.TokenType.AccessToken) {
        var _token = new _AccessTokenResponse.AccessTokenResponse(response);

        _this.dispatchAction(_AuthenticationActionCreators.AuthenticationActionCreators.acquireAccessTokenSuccess(_token));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleLoginFailed", function () {
      var error = _this.getError();

      if (error) {
        _this.dispatchAction(_AuthenticationActionCreators.AuthenticationActionCreators.loginFailed());
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleLoginSuccess", function () {
      var account = _this.getAccountInfo();

      if (account) {
        _this.dispatchAction(_AuthenticationActionCreators.AuthenticationActionCreators.loginSuccessful(account));
      }
    });

    _this.UserAgentApplication = _assertThisInitialized(_this);

    _this.setAuthenticationParameters(_parameters);

    _this.setProviderOptions(_options);

    _this.initializeProvider();

    return _this;
  }

  return MsalAuthProvider;
}(_msal.UserAgentApplication);

exports.MsalAuthProvider = MsalAuthProvider;
//# sourceMappingURL=MsalAuthProvider.js.map