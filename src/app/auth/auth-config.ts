interface AuthConfig {
  clientId: string;
  clientDomain: string;
  audience: string;
  redirect: string;
  scope: string;
}

export const AUTH: AuthConfig = {
  clientId: 'Up12IIdSNCV0z9dBggTq1N9mejooIvPO',
  clientDomain: 'kmaida.auth0.com',
  audience: 'http://localhost:1337/',
  redirect: 'http://localhost:4200/callback',
  scope: 'openid profile email'
};
