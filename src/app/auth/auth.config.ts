import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://login.microsoftonline.com/603e22d9-d29f-40c6-9b49-b5ef654b8271/v2.0',
  redirectUri: window.location.origin + '/home',
  clientId: 'a8c30b06-2e94-4911-bdd2-fea0b63fd7b8',
  responseType: 'code',
  strictDiscoveryDocumentValidation: false,
  scope: 'openid api://a8c30b06-2e94-4911-bdd2-fea0b63fd7b8/app',
};
