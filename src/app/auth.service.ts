/**
 * Created by calderon on 10/11/16.
 */

import {Injectable, OnInit, Output, EventEmitter}      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth implements OnInit {
  // Configure Auth0
  lock = new Auth0Lock('IRPUwl406FAAq6zd4QWEZKUFAH8of29G', 'cimav.auth0.com', {});
  //Store profile object in auth class
  userProfile: Object;
  nickName: string = '';

  @Output() nickNameChange = new EventEmitter();

  constructor() {
    // Set userProfile attribute of already saved profile
    var localUser = localStorage.getItem('profile');
    this.userProfile = JSON.parse(localUser);

    this.setNickName();

    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {

      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        var userProfile = JSON.stringify(profile);
        localStorage.setItem('profile', userProfile);
        this.userProfile = profile;

        this.setNickName();
      });

    });
  }

  ngOnInit(): void {
  }

  private setNickName() {
    if (this.userProfile == null) {
      this.nickName = "";
    } else {
      var userAsJson = JSON.stringify(this.userProfile);
      this.nickName = JSON.parse(userAsJson).nickname;
      var userAsJson = JSON.stringify(this.userProfile);
      this.nickNameChange.emit({
        value: this.nickName
      });
    }
  }

  public isLogged() {
    var result = this.authenticated() && this.userProfile != null;
    if (result) {
      var userAsJson = JSON.stringify(this.userProfile);
      result = result && JSON.parse(userAsJson).email.indexOf('cimav.edu.mx') > 0;
    }
    return result;
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'

    //return tokenNotExpired();
    // https://github.com/auth0/angular2-jwt/issues/334
    return tokenNotExpired('id_token');
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
  };
}
