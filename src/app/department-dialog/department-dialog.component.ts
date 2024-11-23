import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from '../service/department.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Department } from '../model/department';
import { ToastrService, ToastNoAnimation } from 'ngx-toastr';

@Component({
  selector: 'app-department-dialog',
  standalone: false,
  
  templateUrl: './department-dialog.component.html',
  styleUrl: './department-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentDialogComponent {

  departmentTitle:any = '';
  primaryKey: number = 0;
  dialogForm = new FormGroup({
    departmentName: new FormControl('',[Validators.required]),
    departmentHead: new FormControl('',[Validators.required]),
    createdDate: new FormControl('',[Validators.required]),
    departmentId: new FormControl(0)
  });
  myDate = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number}, private dService: DepartmentService,
  private datePipe: DatePipe,private dialogRef: MatDialogRef<DepartmentDialogComponent>, private toaster: ToastrService){
    if(data && data.id){
      this.primaryKey = data.id;
      this.departmentTitle = 'Edit Department';
      this.dService.getDepartmentById(data.id).subscribe((result)=>{
        console.log('dialog result :: ' + result);
        this.dialogForm.setValue({departmentHead:result['departmentHead'], departmentName:result['departmentName'], createdDate:result['createdDate'], departmentId:this.primaryKey})
      })
    }else{
      this.departmentTitle = 'Add Department';
      this.dialogForm.setValue({departmentHead: '', departmentName:'',createdDate: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'), departmentId:0})
    }
  }

  saveDepartment(event:any){
    console.log(this.dialogForm);
    if(this.primaryKey !=0 && !this.dialogForm.invalid){
      this.dService.updateDepartment(this.dialogForm.value as Department).subscribe((result)=>{
        this.toaster.success('Department details updated..', 'Info !!');
        this.dialogRef.close('success');
      });
    }else{
      if(this.primaryKey == 0 && !this.dialogForm.invalid){   
        this.dService.insertDepartment(this.dialogForm.value as Department).subscribe((result)=>{
          this.toaster.success('New Department added..', 'Info !!');
          this.dialogRef.close('success');
        });
      }
    }
  }



}
