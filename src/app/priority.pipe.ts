import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priority'
})
export class PriorityPipe implements PipeTransform {

  transform(value: string): string{
    if(!value) return value;
    const level = value.toLowerCase();

    if(level === 'high') return '🔥 HIGH';
    if(level === 'medium') return '⚡ MEDIUM';
    return '🍃 LOW';

  }

}
