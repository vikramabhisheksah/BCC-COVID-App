import * as React from 'react';
import { IAzureADProps } from './AzureAD';
export declare const withAuthentication: <P extends object>(WrappedComponent: React.ComponentType<P>, parameters: IAzureADProps) => React.FunctionComponent<P>;
