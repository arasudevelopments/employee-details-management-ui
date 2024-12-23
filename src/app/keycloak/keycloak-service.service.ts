import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class KeycloakServiceService {

  private _keyCloak : Keycloak | undefined;
  public _userProfile: UserProfile| undefined;

  get keycloak(){
    if(!this._keyCloak){
      localStorage.setItem('logtime',this.datePipe.transform(new Date(),'yyyy-MM-dd HH:mm:ss')+'');
      this._keyCloak = new Keycloak({
        url:'http://localhost:8080/',
        realm: 'employee-details-management',
        clientId: 'employee-details-management-service'
      })
    };
    return this._keyCloak;
  }

  constructor(private datePipe: DatePipe) { }

  async init(){
    console.log('keyclock initialized...')
    const authenticated = await this.keycloak?.init({
      onLoad:'login-required'
    });
    if(authenticated){
      this._userProfile = (await this.keycloak?.loadUserProfile());
      this._userProfile.token = this.keycloak?.token;
      console.log(' token :: '+ this._userProfile.token)
    }
  }

  login(){
    this.keycloak?.login();
  }

  logout(){
    this.keycloak?.logout({redirectUri: 'http://localhost:4200'});
  }

}
