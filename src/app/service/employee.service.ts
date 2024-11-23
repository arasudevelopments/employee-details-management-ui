import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  public getAllEmployees():Observable<any>{
    return this.httpClient.get("http://localhost:8085/api/employee/allEmployees");
  }

  public getEmployeeById(id:number):Observable<any>{
    let params = new HttpParams().set("empId",id);
    return this.httpClient.get("http://localhost:8085/api/employee/getEmployee", {params:params});
  }

  public updateEmployee(employee : Employee):Observable<any>{
    return this.httpClient.put("http://localhost:8085/api/employee/alterEmployee", employee);
  }

  public insertEmployee(employee: Employee):Observable<any>{
    return this.httpClient.post("http://localhost:8085/api/employee/addEmployee", employee);
  }

  public deleteEmployee(id:number):Observable<any>{
    let params = new HttpParams().set("empId",id);
    return this.httpClient.delete("http://localhost:8085/api/employee/deleteEmployee", {params:params});
  }

  public getDepartmentEmployees(departmentId: number):Observable<any>{
    let params = new HttpParams().set("departmentId",departmentId);
    return this.httpClient.get("http://localhost:8085/api/employee/department",{params:params});
  }

  public findByText(text:string){
    let params = new HttpParams().set("search",text);
    return this.httpClient.get('http://localhost:8085/api/employee/searchEmployee', {params: params});
  }

}
