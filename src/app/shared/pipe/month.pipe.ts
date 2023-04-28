import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'MonthPipe'
})
export class MonthPipe implements PipeTransform {

  transform(value: number): string {
    return `${value} meses` ;
  }

}
