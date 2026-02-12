import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-priority-badge',
  templateUrl: './priority-badge.component.html',
  styleUrls: ['./priority-badge.component.css']
})
export class PriorityBadgeComponent {
  @Input() priorityLevel: 'low' | 'medium' | 'high' = 'medium';
}
