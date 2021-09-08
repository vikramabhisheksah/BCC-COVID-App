"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccessTokenResponse = void 0;

var _enums = require("./enums");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AccessTokenResponse = function AccessTokenResponse(response) {
  _classCallCheck(this, AccessTokenResponse);

  _defineProperty(this, "accessToken", '');

  _defineProperty(this, "scopes", []);

  _defineProperty(this, "expiresOn", void 0);

  _defineProperty(this, "state", '');

  if (response.tokenType !== _enums.TokenType.AccessToken) {
    throw new Error("Can't construct an AccessTokenResponse from a AuthResponse that has a token type of \"".concat(response.tokenType, "\"."));
  }

  this.accessToken = response.accessToken;
  this.expiresOn = response.expiresOn;
  this.scopes = response.scopes;
  this.state = response.accountState;
};

exports.AccessTokenResponse = AccessTokenResponse;
//# sourceMappingURL=AccessTokenResponse.js.map