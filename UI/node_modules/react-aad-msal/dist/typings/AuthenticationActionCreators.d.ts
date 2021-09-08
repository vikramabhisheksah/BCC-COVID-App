import { AuthError } from 'msal';
import { AnyAction } from 'redux';
import { AccessTokenResponse } from './AccessTokenResponse';
import { IdTokenResponse } from './IdTokenResponse';
import { IAccountInfo } from './interfaces';
import { AuthenticationState } from './enums';
export declare abstract class AuthenticationActionCreators {
    static initializing: () => AnyAction;
    static initialized: () => AnyAction;
    static loginSuccessful: (data: IAccountInfo) => AnyAction;
    static loginFailed: () => AnyAction;
    static loginError: (error: AuthError) => AnyAction;
    static clearError: () => AnyAction;
    static logoutSuccessful: () => AnyAction;
    static acquireIdTokenSuccess: (token: IdTokenResponse) => AnyAction;
    static acquireIdTokenError: (error: AuthError) => AnyAction;
    static acquireAccessTokenSuccess: (token: AccessTokenResponse) => AnyAction;
    static acquireAccessTokenError: (error: AuthError) => AnyAction;
    static authenticatedStateChanged: (state: AuthenticationState) => AnyAction;
}
