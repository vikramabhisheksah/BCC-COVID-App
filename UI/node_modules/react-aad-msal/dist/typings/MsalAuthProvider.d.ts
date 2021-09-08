import { AuthenticationParameters, AuthError, Configuration, UserAgentApplication } from 'msal';
import { AnyAction, Store } from 'redux';
import { AccessTokenResponse } from './AccessTokenResponse';
import { IdTokenResponse } from './IdTokenResponse';
import { IAccountInfo, IAuthProvider, IMsalAuthProviderConfig } from './interfaces';
import { AuthenticationState } from './enums';
declare type AuthenticationStateHandler = (state: AuthenticationState) => void;
declare type ErrorHandler = (error: AuthError | null) => void;
declare type AccountInfoHandlers = (accountInfo: IAccountInfo | null) => void;
export declare class MsalAuthProvider extends UserAgentApplication implements IAuthProvider {
    authenticationState: AuthenticationState;
    /**
     * Gives access to the MSAL functionality for advanced usage.
     *
     * @deprecated The MsalAuthProvider class itself extends from UserAgentApplication and has the same functionality
     */
    UserAgentApplication: UserAgentApplication;
    protected _reduxStore: Store;
    protected _parameters: AuthenticationParameters;
    protected _options: IMsalAuthProviderConfig;
    protected _accountInfo: IAccountInfo | null;
    protected _error: AuthError | null;
    private _onAuthenticationStateHandlers;
    private _onAccountInfoHandlers;
    private _onErrorHandlers;
    private _actionQueue;
    constructor(config: Configuration, parameters: AuthenticationParameters, options?: IMsalAuthProviderConfig);
    login: (parameters?: AuthenticationParameters | undefined) => Promise<void>;
    logout: () => void;
    getAccountInfo: () => IAccountInfo | null;
    getAccessToken: (parameters?: AuthenticationParameters | undefined) => Promise<AccessTokenResponse>;
    getIdToken: (parameters?: AuthenticationParameters | undefined) => Promise<IdTokenResponse>;
    getAuthenticationParameters: () => AuthenticationParameters;
    getError: () => {
        errorCode: string;
        errorMessage: string;
        name: string;
        message: string;
        stack?: string | undefined;
    } | null;
    setAuthenticationParameters: (parameters: AuthenticationParameters) => void;
    getProviderOptions: () => IMsalAuthProviderConfig;
    setProviderOptions: (options: IMsalAuthProviderConfig) => void;
    registerReduxStore: (store: Store<any, AnyAction>) => void;
    registerAuthenticationStateHandler: (listener: AuthenticationStateHandler) => void;
    unregisterAuthenticationStateHandler: (listener: AuthenticationStateHandler) => void;
    registerAcountInfoHandler: (listener: AccountInfoHandlers) => void;
    unregisterAccountInfoHandler: (listener: AccountInfoHandlers) => void;
    registerErrorHandler: (listener: ErrorHandler) => void;
    unregisterErrorHandler: (listener: ErrorHandler) => void;
    private setError;
    private loginToRefreshToken;
    private authenticationRedirectCallback;
    private initializeProvider;
    private processLogin;
    private setAuthenticationState;
    private setAccountInfo;
    private dispatchAction;
    private handleAcquireTokenSuccess;
    private handleLoginFailed;
    private handleLoginSuccess;
}
export {};
