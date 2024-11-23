import { Pipe, PipeTransform } from '@angular/core';
import { Department } from './model/department';

@Pipe({
  name: 'department',
  standalone: false
})
export class DepartmentnamePipe implements PipeTransform {

  transform(value: Department[], ...args: unknown[]): unknown {
    value = value.filter((data)=> data.departmentId == args[0]);
    return value[0].departmentName;
  }

}
