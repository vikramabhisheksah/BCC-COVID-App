import * as React from 'react';
import * as ReactDOM from 'react-dom';
require('jest-localstorage-mock'); // tslint:disable-line
import { AzureAD, LoginType } from './index';
import { MsalAuthProvider } from './MsalAuthProvider';
var Enzyme;
var Adapter;
var authProvider;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var testAccount;
beforeAll(function () {
    Enzyme = require('enzyme');
    Adapter = require('enzyme-adapter-react-16');
    Enzyme.configure({ adapter: new Adapter() });
});
beforeEach(function () {
    // values stored in tests will also be available in other tests unless you run
    localStorage.clear();
    authProvider = new MsalAuthProvider({
        auth: {
            authority: 'https://login.microsoftonline.com/common',
            clientId: '<guid>',
        },
        cache: {
            cacheLocation: 'sessionStorage',
        },
    }, {
        scopes: ['openid'],
    }, {
        loginType: LoginType.Popup,
    });
    testAccount = {
        accountIdentifier: 'Something',
        environment: 'testEnv',
        homeAccountIdentifier: 'testIdentifier',
        idToken: {},
        idTokenClaims: {},
        name: 'Lilian',
        sid: 'sid',
        userName: 'LilUsername',
    };
});
it('renders without crashing', function () {
    var unauthenticatedFunction = function () {
        return (React.createElement("div", null,
            React.createElement("h1", null, " unauthenticatedFunction ")));
    };
    var authenticatedFunction = function () {
        return (React.createElement("div", null,
            React.createElement("h1", null, " authenticatedFunction ")));
    };
    var accountInfoCallback = function () {
        // empty
    };
    var div = document.createElement('div');
    ReactDOM.render(React.createElement(AzureAD, { provider: authProvider, unauthenticatedFunction: unauthenticatedFunction, authenticatedFunction: authenticatedFunction, accountInfoCallback: accountInfoCallback }), div);
    ReactDOM.unmountComponentAtNode(div);
});
//# sourceMappingURL=index.test.js.map