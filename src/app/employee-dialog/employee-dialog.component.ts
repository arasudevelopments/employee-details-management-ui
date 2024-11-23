import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../service/employee.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from '../model/department';
import { DepartmentService } from '../service/department.service';
import { Employee } from '../model/employee';
import { ToastrService, ToastNoAnimation } from 'ngx-toastr';

@Component({
  selector: 'app-employee-dialog',
  standalone: false,
  templateUrl: './employee-dialog.component.html',
  styleUrl: './employee-dialog.component.css'
})
export class EmployeeDialogComponent {

  employeeTitle:string = 'Add Employee';
  primaryKey: number = 0;
  dialogForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    age: new FormControl(0,[Validators.required]),
    dateOfJoining: new FormControl(''),
    departmentId:new FormControl('',[Validators.required]),
    employeeId:new FormControl(0)
  });

  departments: Department[] = [];

  myDate = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number}, private eService: EmployeeService,
  private dService: DepartmentService,
  private datePipe: DatePipe,private dialogRef: MatDialogRef<EmployeeDialogComponent>,private toaster: ToastrService ){
    this.dService.getAllDepartments().subscribe((result)=>{
      this.departments = result;
    });
    if(data && data.id){
      this.primaryKey = data.id;
      this.employeeTitle = 'Edit Employee';
      this.eService.getEmployeeById(data.id).subscribe((result)=>{
        console.log('dialog result :: ' + result);
        this.dialogForm.setValue({dateOfJoining:result['dateOfJoining'],name:result['name'], email:result['email'], age:result['age'],departmentId:result['departmentId'],employeeId:this.primaryKey})
      })
    }else{
      this.employeeTitle = 'Add Employee';
      this.dialogForm.setValue({name:'', email:'', age:0,
        dateOfJoining:this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),departmentId:'',employeeId:0})
    }
  }

  saveEmployee(event:any){
    console.log(this.dialogForm);
    if(this.primaryKey !=0 && !this.dialogForm.invalid){
      this.eService.updateEmployee(this.dialogForm.value as Employee).subscribe((result)=>{
        this.toaster.success('Employee details updated..', 'Info !!');
        this.dialogRef.close('success');
      });
    }else{
      if(this.primaryKey == 0 && !this.dialogForm.invalid){   
        this.eService.insertEmployee(this.dialogForm.value as Employee).subscribe((result)=>{
          this.toaster.success('Employee added successfully..', 'Info !!');
          this.dialogRef.close('success');
        });
      }
    }
  }

}
