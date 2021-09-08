import { AuthResponse } from 'msal';
import { IdToken } from 'msal/lib-commonjs/IdToken';
export declare class IdTokenResponse {
    idToken: IdToken;
    state: string;
    constructor(response: AuthResponse);
}
