import { Component, OnInit } from '@angular/core';
import { KeycloakServiceService } from '../keycloak/keycloak-service.service';
import { DepartmentService } from '../service/department.service';
import { EmployeeService } from '../service/employee.service';
import { Department } from '../model/department';
import { Employee } from '../model/employee';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentDialogComponent } from '../department-dialog/department-dialog.component';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { ToastrService, ToastNoAnimation } from 'ngx-toastr';

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
  searchData:string = '';
  loginTime:string = '';

  constructor(private keyClock: KeycloakServiceService, private dService: DepartmentService,
     private eService: EmployeeService, private dialog:MatDialog, private toaster: ToastrService){

  }

  ngOnInit(): void {
    this.username = this.keyClock._userProfile?.firstName;
    this.loginTime = localStorage.getItem('logtime')+'';
  }

  menuButtonClick(event:any){
    if(event.currentTarget.innerText == 'Employees'){
      this.isEmployee = true;
      this.isDepartment = false;
      this.getAllEmployees();
    }else{
      this.isEmployee = false;
      this.isDepartment = true;
      this.getAllDepartmens();
    }
  }

  getAllEmployees(){
    this.eService.getAllEmployees().subscribe((value)=>{
      this.employees = value;
    });
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
      this.toaster.success('Department deleted', 'Info !!');
      this.getAllDepartmens();
    });
  }

  refresh(){
    if(this.isEmployee){
      this.getAllEmployees();
    }else{
      this.getAllDepartmens();
    }
    this.toaster.success('Details Refreshed..', 'Info !!');
  }

  searchText(){
    if(this.isDepartment && this.searchData != ''){
        this.dService.findByText(this.searchData).subscribe((result)=>{
          this.departments = result as Department[];
        });
    }else if(this.isEmployee && this.searchData != ''){
      this.eService.findByText(this.searchData).subscribe((result)=>{
        this.employees = result as Employee[];
      });
    }else if(this.isDepartment && this.searchData ==''){
      this.getAllDepartmens();
    }else if(this.isEmployee && this.searchData == ''){
      this.getAllEmployees();  
    }
  }


  editEmployee(event:any){
    let dialogRef = this.dialog.open(EmployeeDialogComponent,{
      width: '16%',
      height: '75%',
      data:{id:event['employeeId']}
    }).afterClosed().subscribe((result)=>{
      console.log('dialog closed');
    });
  }

  deleteEmployee(event:any){
    this.eService.deleteEmployee(event['employeeId']).subscribe((result)=>{
      this.toaster.success('Employee deleted', 'Info !!');
      this.getAllEmployees();
    });
  }

  addEmployee(){
    let dialogRef = this.dialog.open(EmployeeDialogComponent,{
      width: '16%',
      height: '75%'
    }).afterClosed().subscribe((result)=>{
      console.log('dialog closed');
    });
  }

  viewEmployees(event:any){
    this.isDepartment = false;
    this.isEmployee = true;
    this.eService.getDepartmentEmployees(event['departmentId']).subscribe((result)=>{
      this.employees = result;
    });
  }

}
