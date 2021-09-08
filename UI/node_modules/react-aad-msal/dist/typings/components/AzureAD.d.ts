import { default as React } from 'react';
import { Store } from 'redux';
import { AuthError } from 'msal';
import { MsalAuthProvider } from '..';
import { IAccountInfo } from '../interfaces';
import { AuthenticationState } from '../enums';
declare type AccountInfoCallback = (token: IAccountInfo) => void;
declare type UnauthenticatedFunction = (login: LoginFunction) => JSX.Element;
declare type AuthenticatedFunction = (logout: LogoutFunction) => JSX.Element;
declare type LoginFunction = () => void;
declare type LogoutFunction = () => void;
export interface IAzureADFunctionProps {
    login: LoginFunction;
    logout: LogoutFunction;
    authenticationState: AuthenticationState;
    accountInfo: IAccountInfo | null;
    error: AuthError | null;
}
export interface IAzureADProps {
    provider: MsalAuthProvider;
    unauthenticatedFunction?: UnauthenticatedFunction;
    authenticatedFunction?: AuthenticatedFunction;
    accountInfoCallback?: AccountInfoCallback;
    reduxStore?: Store;
    forceLogin?: boolean;
}
export declare const AzureAD: React.FunctionComponent<IAzureADProps>;
export {};
