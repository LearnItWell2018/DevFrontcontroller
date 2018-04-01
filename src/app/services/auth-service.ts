import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { UserProfile } from '../model/user-profile-model';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: '6rWP2FHwbDR9wT9gqFDiMA7VHD7C7QFT',
    domain: 'kalishiva.auth0.com',
    responseType: 'token id_token',
    audience: 'https://kalishiva.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200',
    scope: 'openid profile'
  });

  userProfile: any;
  public userProfileDetails: UserProfile;

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }


  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      console.log(JSON.stringify(this.auth0.authResult));
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('user_info', JSON.stringify(authResult.idTokenPayload));
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_info');
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(): UserProfile {
    this.userProfileDetails = JSON.parse(localStorage.getItem("user_info"));
    return this.userProfileDetails;
  }

}