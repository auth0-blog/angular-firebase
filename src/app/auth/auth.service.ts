import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from './../../environments/environment';
import * as auth0 from 'auth0-js';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  private _auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientId,
    domain: environment.auth.clientDomain,
    responseType: 'token id_token',
    redirectUri: environment.auth.redirect,
    audience: environment.auth.audience,
    scope: environment.auth.scope
  });
  userProfile: any;
  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  // Create a stream of Firebase authentication status to communicate throughout app
  loggedInFirebase: boolean;
  loggedInFirebase$ = new BehaviorSubject<boolean>(this.loggedInFirebase);
  // Subscribe to the Firebase token stream
  firebaseSub: Subscription;
  // Subscribe to Firebase renewal timer stream
  refreshFirebaseSub: Subscription;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private http: HttpClient) {
      // If authenticated, set local profile property and get new Firebase token.
      // If not authenticated but there are still items n localStorage, log out.
      const lsProfile = localStorage.getItem('profile');
      const lsToken = localStorage.getItem('access_token');

      if (this.tokenValid) {
        this.userProfile = JSON.parse(lsProfile);
        this.setLoggedIn(true);
        this._getFirebaseToken(lsToken);
      } else if (!this.tokenValid && lsProfile) {
        this.logout();
      }
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  setLoggedInFirebase(value: boolean) {
    // Update Firebase login status subject
    this.loggedInFirebase$.next(value);
    this.loggedInFirebase = value;
  }

  login(redirect?: string) {
    // Set redirect after login
    const _redirect = redirect ? redirect : this.router.url;
    localStorage.setItem('auth_redirect', _redirect);
    // Auth0 authorize request
    this._auth0.authorize();
  }

  handleAuth() {
    this.setLoggedIn(null);
    // When Auth0 hash parsed, get profile
    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        // Get Firebase token
        this._getFirebaseToken(authResult.accessToken);
        this._getProfile(authResult);
      } else if (err) {
        this.router.navigate(['/']);
        this.setLoggedIn(undefined);
        console.error(`Error authenticating: ${err.error}`);
      }
    });
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this._auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
        this.router.navigate([localStorage.getItem('auth_redirect')]);
      } else if (err) {
        console.warn(`Error retrieving profile: ${err.error}`);
      }
    });
  }

  private _setSession(authResult, profile) {
    // Set tokens and expiration in localStorage
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // Set profile information
    localStorage.setItem('profile', JSON.stringify(profile));
    this.userProfile = profile;
    // Session set; set loggedIn
    this.setLoggedIn(true);
  }

  private _getFirebaseToken(accessToken) {
    const getToken$ = () => {
      return this.http
        .get(`http://localhost:1337/auth/firebase`, {
          headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
        });
    };
    this.firebaseSub = getToken$().subscribe(
      res => this._firebaseAuth(res),
      err => console.error(`An error occurred fetching Firebase token: ${err}`)
    );
  }

  private _firebaseAuth(tokenObj) {
    this.afAuth.auth.signInWithCustomToken(tokenObj.firebaseToken)
      .then(res => {
        // Emit loggedInFirebase$ subject with true value
        this.setLoggedInFirebase(true);
        // Schedule token renewal
        this.scheduleFirebaseRenewal();
        console.log('Successfully authenticated with Firebase!');
      })
      .catch(err => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.error(`${errorCode} Could not log into Firebase: ${errorMessage}`);
        // Emit loggedInFirebase$ subject with undefined value
        this.setLoggedInFirebase(false);
      });
  }

  logout() {
    // Ensure all auth items removed from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('auth_redirect');
    // Reset local properties, update loggedIn$ stream
    this.userProfile = undefined;
    this.setLoggedIn(false);
    // Sign out of Firebase
    this.setLoggedInFirebase(false);
    this.afAuth.auth.signOut();
    // Return to homepage
    this.router.navigate(['/']);
  }

  get tokenValid(): boolean {
    // Check if current time is past access token's expiration
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

  scheduleFirebaseRenewal() {
    // If user isn't authenticated with Firebase, do nothing
    if (!this.loggedInFirebase) { return; }
    // Unsubscribe from previous expiration observable
    this.unscheduleFirebaseRenewal();
    // Create and subscribe to expiration observable
    // Custom Firebase tokens minted by Firebase
    // expire after 3600 seconds (1 hour)
    const expiresAt = new Date().getTime() + (3600 * 1000);
    const expiresIn$ = Observable.of(expiresAt)
      .mergeMap(
        expires => {
          const now = Date.now();
          // Use timer to track delay until expiration
          // to run the refresh at the proper time
          return Observable.timer(Math.max(1, expires - now));
        }
      );

    this.refreshFirebaseSub = expiresIn$
      .subscribe(
        () => {
          console.log('Firebase token expired; fetching a new one');
          this._getFirebaseToken(localStorage.getItem('access_token'));
          this.scheduleFirebaseRenewal();
        }
      );
  }

  unscheduleFirebaseRenewal() {
    if (this.refreshFirebaseSub) {
      this.refreshFirebaseSub.unsubscribe();
    }
  }

}
