import { TokenType } from './enums';
var IdTokenResponse = /** @class */ (function () {
    function IdTokenResponse(response) {
        this.state = '';
        if (response.tokenType !== TokenType.IdToken) {
            throw new Error("Can't construct an IdTokenResponse from a AuthResponse that has a token type of \"" + response.tokenType + "\".");
        }
        this.idToken = response.idToken;
        this.state = response.accountState;
    }
    return IdTokenResponse;
}());
export { IdTokenResponse };
//# sourceMappingURL=IdTokenResponse.js.map