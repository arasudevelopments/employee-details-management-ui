import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { KeycloakServiceService } from '../keycloak/keycloak-service.service';

@Injectable()
export class EmployeeInterceptor implements HttpInterceptor{

    constructor(private keycloakservice :KeycloakServiceService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.keycloakservice.keycloak.token;
        if(token){
            const autreq= req.clone({
                headers: new HttpHeaders({
                    Authorization: `Bearer ${token}`
                })
            });
            return next.handle(autreq);
        }else{
            return next.handle(req);
        }
    }
    
}