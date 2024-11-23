import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../model/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpCleint: HttpClient) { }

  public getAllDepartments(): Observable<any>{
    return this.httpCleint.get('http://localhost:8085/api/department/allDepartments');
  }

  public getDepartmentById(id:number):Observable<any>{
    let params = new HttpParams().set("departmentId",id);
    return this.httpCleint.get('http://localhost:8085/api/department/',{params:params});
  }

  public insertDepartment(department: Department): Observable<any>{
    return this.httpCleint.post('http://localhost:8085/api/department/add', department);
  }

  public updateDepartment(department: Department): Observable<any>{
    return this.httpCleint.put('http://localhost:8085/api/department/alterDepartment', department);
  }

  public deleteDepartment(id: number){
    let params = new HttpParams().set("id",id);
    return this.httpCleint.delete('http://localhost:8085/api/department/removeDepartment',{params:params});
  }

  public findByText(text:string){
    let params = new HttpParams().set("search",text);
    return this.httpCleint.get('http://localhost:8085/api/department/search', {params: params});
  }
}
