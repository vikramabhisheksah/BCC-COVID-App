import { LoginType } from '../enums';
export interface IMsalAuthProviderConfig {
    loginType: LoginType;
    tokenRefreshUri?: string;
}
