import { TokenType } from './enums';
var AccessTokenResponse = /** @class */ (function () {
    function AccessTokenResponse(response) {
        this.accessToken = '';
        this.scopes = [];
        this.state = '';
        if (response.tokenType !== TokenType.AccessToken) {
            throw new Error("Can't construct an AccessTokenResponse from a AuthResponse that has a token type of \"" + response.tokenType + "\".");
        }
        this.accessToken = response.accessToken;
        this.expiresOn = response.expiresOn;
        this.scopes = response.scopes;
        this.state = response.accountState;
    }
    return AccessTokenResponse;
}());
export { AccessTokenResponse };
//# sourceMappingURL=AccessTokenResponse.js.map