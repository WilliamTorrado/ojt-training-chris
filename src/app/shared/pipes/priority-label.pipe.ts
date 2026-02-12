import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityLabel'
})
export class PriorityLabelPipe implements PipeTransform {
  transform(value: 'low' | 'medium' | 'high' | null | undefined): string {
    if (!value) return '';
    const labels = {
      low: 'Low Priority',
      medium: 'Medium Priority',
      high: 'High Priority'
    };
    return labels[value] || value;
  }
}
