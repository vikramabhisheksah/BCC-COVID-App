"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IdTokenResponse = void 0;

var _enums = require("./enums");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IdTokenResponse = function IdTokenResponse(response) {
  _classCallCheck(this, IdTokenResponse);

  _defineProperty(this, "idToken", void 0);

  _defineProperty(this, "state", '');

  if (response.tokenType !== _enums.TokenType.IdToken) {
    throw new Error("Can't construct an IdTokenResponse from a AuthResponse that has a token type of \"".concat(response.tokenType, "\"."));
  }

  this.idToken = response.idToken;
  this.state = response.accountState;
};

exports.IdTokenResponse = IdTokenResponse;
//# sourceMappingURL=IdTokenResponse.js.map