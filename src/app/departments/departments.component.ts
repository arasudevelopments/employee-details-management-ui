import { Component, OnInit } from '@angular/core';
import { KeycloakServiceService } from '../keycloak/keycloak-service.service';
import { DepartmentService } from '../service/department.service';
import { EmployeeService } from '../service/employee.service';
import { Department } from '../model/department';
import { Employee } from '../model/employee';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentDialogComponent } from '../department-dialog/department-dialog.component';

@Component({
  selector: 'app-departments',
  standalone: false,
  
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent implements OnInit{

  username:any = '';
  menuItem:any = ['Departments', 'Employees'];
  isEmployee:boolean = false;
  isDepartment:boolean = false;
  departments: Department[] = [];
  employees: Employee[] = [];

  constructor(private keyClock: KeycloakServiceService, private dService: DepartmentService,
     private eService: EmployeeService, private dialog:MatDialog){

  }


  ngOnInit(): void {
    this.username = this.keyClock._userProfile?.firstName;
  }

  menuButtonClick(event:any){
    if(event.currentTarget.innerText == 'Employees'){
      this.isEmployee = true;
      this.isDepartment = false;
      this.eService.getAllEmployees().subscribe((value)=>{
        this.employees = value;
      });
    }else{
      this.isEmployee = false;
      this.isDepartment = true;
      this.getAllDepartmens();
    }
  }

  getAllDepartmens(){
    this.dService.getAllDepartments().subscribe((value)=>{
      this.departments = value;
    });
  }

  logout(){
    this.keyClock.logout();
  }

  addDepartment(){
    let dialogRef = this.dialog.open(DepartmentDialogComponent,{
      width: '20%',
      height: '54%'
    }).afterClosed().subscribe((result)=>{
      console.log('dialog closed');
    });
  }

  editDepartment(event:any){
    let dialogRef = this.dialog.open(DepartmentDialogComponent,{
      width: '20%',
      height: '54%',
      data:{id:event['departmentId']}
    });
  }

  deleteDepartment(event:any){
    this.dService.deleteDepartment(event['departmentId']).subscribe((result)=>{
      console.log(result);
      this.getAllDepartmens();
    });
  }



  addEmployee(){

  }

}
