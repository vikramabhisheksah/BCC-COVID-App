var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { ClientAuthError, InteractionRequiredAuthError, UserAgentApplication, } from 'msal';
import { AccessTokenResponse } from './AccessTokenResponse';
import { AuthenticationActionCreators } from './AuthenticationActionCreators';
import { IdTokenResponse } from './IdTokenResponse';
import { Logger } from './Logger';
import { AuthenticationState, LoginType, TokenType } from './enums';
var MsalAuthProvider = /** @class */ (function (_super) {
    __extends(MsalAuthProvider, _super);
    function MsalAuthProvider(config, parameters, options) {
        if (options === void 0) { options = {
            loginType: LoginType.Popup,
            tokenRefreshUri: window.location.origin,
        }; }
        var _this = _super.call(this, config) || this;
        _this._onAuthenticationStateHandlers = new Set();
        _this._onAccountInfoHandlers = new Set();
        _this._onErrorHandlers = new Set();
        _this._actionQueue = [];
        _this.login = function (parameters) { return __awaiter(_this, void 0, void 0, function () {
            var params, error, providerOptions, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = parameters || this.getAuthenticationParameters();
                        error = this.getError();
                        if (error && error.errorCode !== 'block_token_requests') {
                            this.setError(null);
                        }
                        providerOptions = this.getProviderOptions();
                        if (!(providerOptions.loginType === LoginType.Redirect)) return [3 /*break*/, 1];
                        this.setAuthenticationState(AuthenticationState.InProgress);
                        try {
                            this.loginRedirect(params);
                        }
                        catch (error) {
                            Logger.ERROR(error);
                            this.setError(error);
                            this.setAuthenticationState(AuthenticationState.Unauthenticated);
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        if (!(providerOptions.loginType === LoginType.Popup)) return [3 /*break*/, 7];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        this.setAuthenticationState(AuthenticationState.InProgress);
                        return [4 /*yield*/, this.loginPopup(params)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        Logger.ERROR(error_1);
                        this.setError(error_1);
                        this.setAuthenticationState(AuthenticationState.Unauthenticated);
                        return [3 /*break*/, 5];
                    case 5: return [4 /*yield*/, this.processLogin()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        _this.logout = function () {
            _super.prototype.logout.call(_this);
            _this.dispatchAction(AuthenticationActionCreators.logoutSuccessful());
        };
        _this.getAccountInfo = function () {
            return _this._accountInfo ? __assign({}, _this._accountInfo) : null;
        };
        _this.getAccessToken = function (parameters) { return __awaiter(_this, void 0, void 0, function () {
            var providerOptions, refreshParams, response, error_2, loginParams, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        providerOptions = this.getProviderOptions();
                        refreshParams = __assign({}, (parameters || this.getAuthenticationParameters()), { 
                            // Use the redirectUri that was passed, otherwise use the configured tokenRefreshUri
                            redirectUri: (parameters && parameters.redirectUri) || providerOptions.tokenRefreshUri });
                        /* In this library, acquireTokenSilent is being called only when there is an accountInfo of an expired session.
                            *  In a scenario where user interaction is required, username from the account info is passed as 'login_hint'
                            *  parameter which redirects user to user's organization login page. So 'domain_hint' is not required to be
                            *  passed for silent calls. Hence, the below code is to avoid sending domain_hint. This also solves the issue
                            *  of multiple domain_hint param being added by the MSAL.js.
                        */
                        if (refreshParams.extraQueryParameters && refreshParams.extraQueryParameters.domain_hint) {
                            delete refreshParams.extraQueryParameters.domain_hint;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, this.acquireTokenSilent(refreshParams)];
                    case 2:
                        response = _a.sent();
                        this.handleAcquireTokenSuccess(response);
                        this.setAuthenticationState(AuthenticationState.Authenticated);
                        return [2 /*return*/, new AccessTokenResponse(response)];
                    case 3:
                        error_2 = _a.sent();
                        loginParams = __assign({}, (parameters || this.getAuthenticationParameters()));
                        this.dispatchAction(AuthenticationActionCreators.acquireAccessTokenError(error_2));
                        return [4 /*yield*/, this.loginToRefreshToken(error_2, loginParams)];
                    case 4:
                        response = _a.sent();
                        return [2 /*return*/, new AccessTokenResponse(response)];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this.getIdToken = function (parameters) { return __awaiter(_this, void 0, void 0, function () {
            var providerOptions, config, clientId, refreshParams, response, error_3, loginParams, account, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        providerOptions = this.getProviderOptions();
                        config = this.getCurrentConfiguration();
                        clientId = config.auth.clientId;
                        refreshParams = __assign({}, (parameters || this.getAuthenticationParameters()), { 
                            // Use the redirectUri that was passed, otherwise use the configured tokenRefreshUri
                            redirectUri: (parameters && parameters.redirectUri) || providerOptions.tokenRefreshUri, 
                            // Pass the clientId as the only scope to get a renewed IdToken if it has expired
                            scopes: [clientId] });
                        /* In this library, acquireTokenSilent is being called only when there is an accountInfo of an expired session.
                            *  In a scenario where user interaction is required, username from the account info is passed as 'login_hint'
                            *  parameter which redirects user to user's organization login page. So 'domain_hint' is not required to be
                            *  passed for silent calls. Hence, the below code is to avoid sending domain_hint. This also solves the issue
                            *  of multiple domain_hint param being added by the MSAL.js.
                        */
                        if (refreshParams.extraQueryParameters && refreshParams.extraQueryParameters.domain_hint) {
                            delete refreshParams.extraQueryParameters.domain_hint;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, this.acquireTokenSilent(refreshParams)];
                    case 2:
                        response = _a.sent();
                        this.handleAcquireTokenSuccess(response);
                        this.setAuthenticationState(AuthenticationState.Authenticated);
                        return [2 /*return*/, new IdTokenResponse(response)];
                    case 3:
                        error_3 = _a.sent();
                        loginParams = __assign({}, (parameters || this.getAuthenticationParameters()));
                        account = this.getAccount();
                        if (account && (!parameters || !parameters.loginHint)) {
                            loginParams.loginHint = account.userName;
                        }
                        this.dispatchAction(AuthenticationActionCreators.acquireIdTokenError(error_3));
                        return [4 /*yield*/, this.loginToRefreshToken(error_3, loginParams)];
                    case 4:
                        response = _a.sent();
                        return [2 /*return*/, new IdTokenResponse(response)];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this.getAuthenticationParameters = function () {
            return __assign({}, _this._parameters);
        };
        _this.getError = function () {
            return _this._error ? __assign({}, _this._error) : null;
        };
        _this.setAuthenticationParameters = function (parameters) {
            _this._parameters = __assign({}, parameters);
        };
        _this.getProviderOptions = function () {
            return __assign({}, _this._options);
        };
        _this.setProviderOptions = function (options) {
            _this._options = __assign({}, options);
            if (options.loginType === LoginType.Redirect) {
                _this.handleRedirectCallback(_this.authenticationRedirectCallback);
            }
        };
        _this.registerReduxStore = function (store) {
            _this._reduxStore = store;
            while (_this._actionQueue.length) {
                var action = _this._actionQueue.shift();
                if (action) {
                    _this.dispatchAction(action);
                }
            }
        };
        _this.registerAuthenticationStateHandler = function (listener) {
            _this._onAuthenticationStateHandlers.add(listener);
            listener(_this.authenticationState);
        };
        _this.unregisterAuthenticationStateHandler = function (listener) {
            _this._onAuthenticationStateHandlers.delete(listener);
        };
        _this.registerAcountInfoHandler = function (listener) {
            _this._onAccountInfoHandlers.add(listener);
            listener(_this._accountInfo);
        };
        _this.unregisterAccountInfoHandler = function (listener) {
            _this._onAccountInfoHandlers.delete(listener);
        };
        _this.registerErrorHandler = function (listener) {
            _this._onErrorHandlers.add(listener);
            listener(_this._error);
        };
        _this.unregisterErrorHandler = function (listener) {
            _this._onErrorHandlers.delete(listener);
        };
        _this.setError = function (error) {
            _this._error = error ? __assign({}, error) : null;
            if (error) {
                _this.dispatchAction(AuthenticationActionCreators.loginError(error));
            }
            _this._onErrorHandlers.forEach(function (listener) { return listener(_this._error); });
            return __assign({}, _this._error);
        };
        _this.loginToRefreshToken = function (error, parameters) { return __awaiter(_this, void 0, void 0, function () {
            var providerOptions, params, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        providerOptions = this.getProviderOptions();
                        params = parameters || this.getAuthenticationParameters();
                        if (!(error instanceof InteractionRequiredAuthError)) return [3 /*break*/, 5];
                        if (providerOptions.loginType === LoginType.Redirect) {
                            this.acquireTokenRedirect(params);
                            // Nothing to return, the user is redirected to the login page
                            return [2 /*return*/, new Promise(function (resolve) { return resolve(); })];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.acquireTokenPopup(params)];
                    case 2:
                        response = _a.sent();
                        this.handleAcquireTokenSuccess(response);
                        this.setAuthenticationState(AuthenticationState.Authenticated);
                        return [2 /*return*/, response];
                    case 3:
                        error_4 = _a.sent();
                        Logger.ERROR(error_4);
                        this.setError(error_4);
                        this.setAuthenticationState(AuthenticationState.Unauthenticated);
                        throw error_4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        Logger.ERROR(error);
                        this.setError(error);
                        this.setAuthenticationState(AuthenticationState.Unauthenticated);
                        throw error;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        _this.authenticationRedirectCallback = function (error) {
            if (error) {
                _this.setError(error);
            }
            _this.processLogin();
        };
        _this.initializeProvider = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.dispatchAction(AuthenticationActionCreators.initializing());
                        return [4 /*yield*/, this.processLogin()];
                    case 1:
                        _a.sent();
                        this.dispatchAction(AuthenticationActionCreators.initialized());
                        return [2 /*return*/];
                }
            });
        }); };
        _this.processLogin = function () { return __awaiter(_this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.getError()) return [3 /*break*/, 1];
                        this.handleLoginFailed();
                        this.setAuthenticationState(AuthenticationState.Unauthenticated);
                        return [3 /*break*/, 7];
                    case 1:
                        if (!this.getAccount()) return [3 /*break*/, 6];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        // If the IdToken has expired, refresh it. Otherwise use the cached token
                        return [4 /*yield*/, this.getIdToken()];
                    case 3:
                        // If the IdToken has expired, refresh it. Otherwise use the cached token
                        _a.sent();
                        this.handleLoginSuccess();
                        return [3 /*break*/, 5];
                    case 4:
                        error_5 = _a.sent();
                        // Swallow the error if the user isn't authenticated, just set to Unauthenticated
                        if (!(error_5 instanceof ClientAuthError && error_5.errorCode === 'user_login_error')) {
                            Logger.ERROR(error_5);
                            this.setError(error_5);
                        }
                        this.setAuthenticationState(AuthenticationState.Unauthenticated);
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        if (this.getLoginInProgress()) {
                            this.setAuthenticationState(AuthenticationState.InProgress);
                        }
                        else {
                            this.setAuthenticationState(AuthenticationState.Unauthenticated);
                        }
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        _this.setAuthenticationState = function (state) {
            if (_this.authenticationState !== state) {
                _this.authenticationState = state;
                _this.dispatchAction(AuthenticationActionCreators.authenticatedStateChanged(state));
                _this._onAuthenticationStateHandlers.forEach(function (listener) { return listener(state); });
            }
            return _this.authenticationState;
        };
        _this.setAccountInfo = function (response) {
            var accountInfo = _this.getAccountInfo() || { account: response.account };
            // Depending on the token type of the auth response, update the correct property
            if (response.tokenType === TokenType.IdToken) {
                accountInfo.jwtIdToken = response.idToken.rawIdToken;
            }
            else if (response.tokenType === TokenType.AccessToken) {
                accountInfo.jwtAccessToken = response.accessToken;
            }
            _this._accountInfo = __assign({}, accountInfo);
            _this._onAccountInfoHandlers.forEach(function (listener) { return listener(_this._accountInfo); });
            return __assign({}, _this._accountInfo);
        };
        _this.dispatchAction = function (action) {
            if (_this._reduxStore) {
                _this._reduxStore.dispatch(action);
            }
            else {
                _this._actionQueue.push(action);
            }
        };
        _this.handleAcquireTokenSuccess = function (response) {
            _this.setAccountInfo(response);
            if (response.tokenType === TokenType.IdToken) {
                var token = new IdTokenResponse(response);
                _this.dispatchAction(AuthenticationActionCreators.acquireIdTokenSuccess(token));
            }
            else if (response.tokenType === TokenType.AccessToken) {
                var token = new AccessTokenResponse(response);
                _this.dispatchAction(AuthenticationActionCreators.acquireAccessTokenSuccess(token));
            }
        };
        _this.handleLoginFailed = function () {
            var error = _this.getError();
            if (error) {
                _this.dispatchAction(AuthenticationActionCreators.loginFailed());
            }
        };
        _this.handleLoginSuccess = function () {
            var account = _this.getAccountInfo();
            if (account) {
                _this.dispatchAction(AuthenticationActionCreators.loginSuccessful(account));
            }
        };
        // Required only for backward compatibility
        _this.UserAgentApplication = _this;
        _this.setAuthenticationParameters(parameters);
        _this.setProviderOptions(options);
        _this.initializeProvider();
        return _this;
    }
    return MsalAuthProvider;
}(UserAgentApplication));
export { MsalAuthProvider };
//# sourceMappingURL=MsalAuthProvider.js.map