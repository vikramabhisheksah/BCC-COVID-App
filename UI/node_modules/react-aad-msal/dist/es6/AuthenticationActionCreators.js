import { AuthenticationActions } from './enums';
var AuthenticationActionCreators = /** @class */ (function () {
    function AuthenticationActionCreators() {
    }
    AuthenticationActionCreators.initializing = function () { return ({
        type: AuthenticationActions.Initializing,
    }); };
    AuthenticationActionCreators.initialized = function () { return ({
        type: AuthenticationActions.Initialized,
    }); };
    AuthenticationActionCreators.loginSuccessful = function (data) { return ({
        payload: data,
        type: AuthenticationActions.LoginSuccess,
    }); };
    AuthenticationActionCreators.loginFailed = function () { return ({
        type: AuthenticationActions.LoginFailed,
    }); };
    AuthenticationActionCreators.loginError = function (error) { return ({
        payload: error,
        type: AuthenticationActions.LoginError,
    }); };
    AuthenticationActionCreators.clearError = function () { return ({
        type: AuthenticationActions.ClearError,
    }); };
    AuthenticationActionCreators.logoutSuccessful = function () { return ({
        type: AuthenticationActions.LogoutSuccess,
    }); };
    AuthenticationActionCreators.acquireIdTokenSuccess = function (token) { return ({
        payload: token,
        type: AuthenticationActions.AcquiredIdTokenSuccess,
    }); };
    AuthenticationActionCreators.acquireIdTokenError = function (error) { return ({
        payload: error,
        type: AuthenticationActions.AcquiredIdTokenError,
    }); };
    AuthenticationActionCreators.acquireAccessTokenSuccess = function (token) { return ({
        payload: token,
        type: AuthenticationActions.AcquiredAccessTokenSuccess,
    }); };
    AuthenticationActionCreators.acquireAccessTokenError = function (error) { return ({
        payload: error,
        type: AuthenticationActions.AcquiredAccessTokenError,
    }); };
    AuthenticationActionCreators.authenticatedStateChanged = function (state) { return ({
        payload: state,
        type: AuthenticationActions.AuthenticatedStateChanged,
    }); };
    return AuthenticationActionCreators;
}());
export { AuthenticationActionCreators };
//# sourceMappingURL=AuthenticationActionCreators.js.map