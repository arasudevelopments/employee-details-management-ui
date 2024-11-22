import { APP_INITIALIZER, ChangeDetectionStrategy, inject, NgModule, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakServiceService } from './keycloak/keycloak-service.service';
import { DepartmentsComponent } from './departments/departments.component';
import { UserProfile } from './keycloak/user-profile'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EmployeeInterceptor } from './guard/employee.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule} from '@angular/material/dialog';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { DepartmentDialogComponent } from './department-dialog/department-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';


export function kcFactory(keycloakservice : KeycloakServiceService){
  return ()=> keycloakservice.init();
}

@NgModule({
  declarations: [
    AppComponent,
    DepartmentsComponent,
    EmployeeDialogComponent,
    DepartmentDialogComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    DatePipe,
    provideNativeDateAdapter(),
    {
      provide:HTTP_INTERCEPTORS,
      useClass: EmployeeInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      multi: true,
      deps: [KeycloakServiceService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
