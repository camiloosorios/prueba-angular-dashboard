import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private oAuthService: OAuthService) {
    this.initAuth();
  }
  
  initAuth(): void {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      redirectUri: window.location.origin + '/dashboard',
      clientId: environment.GOOGLE_CLIENT_ID,
      dummyClientSecret: environment.GOOGLE_CLIENT_SECRET,
      responseType: 'code',
      scope: 'openid profile email',
      strictDiscoveryDocumentValidation: false,
    };

    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    
  }
  
  login(): void {
    this.oAuthService.loadDiscoveryDocumentAndLogin().then(() => {
      this.oAuthService.initLoginFlow();
    });
  }

  logout(): void {
    this.oAuthService.logOut();
  }

  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
        const isAuthenticated = this.oAuthService.hasValidAccessToken();
        observer.next(isAuthenticated);
        observer.complete();
      }).catch(() => {
        observer.next(false);
        observer.complete();
      });
    });
  }

  getProfile(): Observable<any> {
    return new Observable<any>((observer) => {
      this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
        const profile = this.oAuthService.getIdentityClaims();
        observer.next(profile);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }
}
