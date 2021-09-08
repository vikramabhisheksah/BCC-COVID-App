import { AuthResponse } from 'msal';
export declare class AccessTokenResponse {
    accessToken: string;
    scopes: string[];
    expiresOn: Date;
    state: string;
    constructor(response: AuthResponse);
}
