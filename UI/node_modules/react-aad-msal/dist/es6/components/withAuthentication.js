var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { AzureAD } from './AzureAD';
export var withAuthentication = function (WrappedComponent, parameters) {
    // tslint:disable-next-line: no-shadowed-variable
    var withAuthentication = function (props) {
        var propParams = __assign({ forceLogin: true }, parameters);
        withAuthentication.displayName = "withAuthentication(" + (WrappedComponent.displayName || WrappedComponent.name);
        return (React.createElement(AzureAD, __assign({}, propParams),
            React.createElement(WrappedComponent, __assign({}, props))));
    };
    return withAuthentication;
};
//# sourceMappingURL=withAuthentication.js.map