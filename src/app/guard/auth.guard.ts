import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { KeycloakServiceService } from "../keycloak/keycloak-service.service";

export const authGuard: CanActivateFn = () =>{
     const keyCloak = inject(KeycloakServiceService);
     const router = inject(Router);
     if(keyCloak.keycloak.isTokenExpired()){
        router.navigate(['']);
        console.log('auth gaurd not verified')
        return false;
     }else{
        console.log('auth gaurd verified')
        return true;
     }
}