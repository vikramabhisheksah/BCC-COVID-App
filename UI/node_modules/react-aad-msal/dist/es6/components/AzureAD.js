import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthenticationState } from '../enums';
export var AzureAD = function (props) {
    var authenticatedFunction = props.authenticatedFunction, unauthenticatedFunction = props.unauthenticatedFunction, provider = props.provider, forceLogin = props.forceLogin, accountInfoCallback = props.accountInfoCallback;
    var _a = useState(provider.getAccountInfo()), accountInfo = _a[0], _setAccountInfo = _a[1];
    var _b = useState(provider.authenticationState), authenticationState = _b[0], _setAuthenticationState = _b[1];
    var _c = useState(provider.getError()), error = _c[0], _setError = _c[1];
    // On component mounted
    useEffect(function () {
        provider.registerAuthenticationStateHandler(setAuthenticationState);
        provider.registerAcountInfoHandler(onAccountInfoChanged);
        provider.registerErrorHandler(setError);
        if (props.reduxStore) {
            provider.registerReduxStore(props.reduxStore);
        }
        if (forceLogin && authenticationState === AuthenticationState.Unauthenticated && !error) {
            login();
        }
        // Cleanup on unmount
        return function () {
            provider.unregisterAuthenticationStateHandler(setAuthenticationState);
            provider.unregisterAccountInfoHandler(onAccountInfoChanged);
            provider.unregisterErrorHandler(setError);
        };
    }, [authenticationState, accountInfo, error]);
    var login = useCallback(function () {
        provider.login();
    }, [provider]);
    var logout = useCallback(function () {
        if (authenticationState !== AuthenticationState.Authenticated) {
            return;
        }
        provider.logout();
    }, [authenticationState, provider]);
    var setAuthenticationState = useCallback(function (newState) {
        if (newState !== authenticationState) {
            _setAuthenticationState(newState);
            if (newState === AuthenticationState.Unauthenticated && forceLogin && !error) {
                login();
            }
        }
    }, [authenticationState, forceLogin, error]);
    var setError = useCallback(function (newError) {
        if (newError !== error) {
            _setError(newError);
        }
    }, [error]);
    var onAccountInfoChanged = useCallback(function (newAccountInfo) {
        _setAccountInfo(newAccountInfo);
        if (accountInfoCallback) {
            // eslint-disable-next-line no-console
            console.warn('Warning! The accountInfoCallback callback has been deprecated and will be removed in a future release.');
            accountInfoCallback(newAccountInfo);
        }
    }, [accountInfoCallback]);
    // The authentication data to be passed to the children() if it's a function
    var childrenFunctionProps = useMemo(function () { return ({
        accountInfo: accountInfo,
        authenticationState: authenticationState,
        error: error,
        login: login,
        logout: logout,
    }); }, [accountInfo, authenticationState, error, login, logout]);
    /**
     * @param children
     * @param childrenProps
     */
    function getChildrenOrFunction(children, childrenProps) {
        if (children) {
            // tslint:disable-next-line: triple-equals
            if (isChildrenFunction(children)) {
                return children(childrenProps);
            }
            else {
                return children;
            }
        }
        else {
            return null;
        }
    }
    /**
     * @param children
     */
    function isChildrenFunction(children) {
        return typeof children == 'function' || false;
    }
    // Render logic
    switch (authenticationState) {
        case AuthenticationState.Authenticated:
            if (authenticatedFunction) {
                var authFunctionResult = authenticatedFunction(logout);
                // eslint-disable-next-line no-console
                console.warn('Warning! The authenticatedFunction callback has been deprecated and will be removed in a future release.');
                if (authFunctionResult) {
                    return authFunctionResult;
                }
            }
            // If there is no authenticatedFunction, or it returned null, render the children
            return getChildrenOrFunction(props.children, childrenFunctionProps);
        case AuthenticationState.Unauthenticated:
            if (unauthenticatedFunction) {
                // eslint-disable-next-line no-console
                console.warn('Warning! The unauthenticatedFunction callback has been deprecated and will be removed in a future release.');
                return unauthenticatedFunction(login) || null;
            }
        // If state is Uauthenticated or InProgress, only return the children if it's a function
        // If the children prop is a function, we will pass state changes to be handled by the consumer
        // eslint-disable-next-line no-fallthrough
        case AuthenticationState.InProgress:
            if (isChildrenFunction(props.children)) {
                return getChildrenOrFunction(props.children, childrenFunctionProps);
            }
            return null;
        default:
            return null;
    }
};
AzureAD.displayName = 'AzureAD';
//# sourceMappingURL=AzureAD.js.map