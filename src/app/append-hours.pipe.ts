// append-hours.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appendHours' })
export class AppendHoursPipe implements PipeTransform {
  transform(value: number): string {
    return `${value} Hours`;
  }
}

// suffix-hours.pipe.ts

