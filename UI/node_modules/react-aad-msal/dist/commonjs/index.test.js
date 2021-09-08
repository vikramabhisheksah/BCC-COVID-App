"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _index = require("./index");

var _MsalAuthProvider = require("./MsalAuthProvider");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

require('jest-localstorage-mock');

var Enzyme;
var Adapter;
var authProvider;
var testAccount;
beforeAll(function () {
  Enzyme = require('enzyme');
  Adapter = require('enzyme-adapter-react-16');
  Enzyme.configure({
    adapter: new Adapter()
  });
});
beforeEach(function () {
  localStorage.clear();
  authProvider = new _MsalAuthProvider.MsalAuthProvider({
    auth: {
      authority: 'https://login.microsoftonline.com/common',
      clientId: '<guid>'
    },
    cache: {
      cacheLocation: 'sessionStorage'
    }
  }, {
    scopes: ['openid']
  }, {
    loginType: _index.LoginType.Popup
  });
  testAccount = {
    accountIdentifier: 'Something',
    environment: 'testEnv',
    homeAccountIdentifier: 'testIdentifier',
    idToken: {},
    idTokenClaims: {},
    name: 'Lilian',
    sid: 'sid',
    userName: 'LilUsername'
  };
});
it('renders without crashing', function () {
  var unauthenticatedFunction = function unauthenticatedFunction() {
    return React.createElement("div", null, React.createElement("h1", null, " unauthenticatedFunction "));
  };

  var authenticatedFunction = function authenticatedFunction() {
    return React.createElement("div", null, React.createElement("h1", null, " authenticatedFunction "));
  };

  var accountInfoCallback = function accountInfoCallback() {};

  var div = document.createElement('div');
  ReactDOM.render(React.createElement(_index.AzureAD, {
    provider: authProvider,
    unauthenticatedFunction: unauthenticatedFunction,
    authenticatedFunction: authenticatedFunction,
    accountInfoCallback: accountInfoCallback
  }), div);
  ReactDOM.unmountComponentAtNode(div);
});
//# sourceMappingURL=index.test.js.map