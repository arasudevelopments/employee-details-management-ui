import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  public getAllEmployees():Observable<any>{
    return this.httpClient.get("http://localhost:8085/api/employee/allEmployees");
  }
}
