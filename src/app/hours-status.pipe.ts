import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoursStatus'
})
export class HoursStatusPipe implements PipeTransform {

  transform(remainingHours: number): string {
    return remainingHours <= 0 ? 'Completed' : 'Ongoing';
  }
}