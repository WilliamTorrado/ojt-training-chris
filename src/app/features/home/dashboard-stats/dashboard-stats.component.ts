import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.css']
})
export class DashboardStatsComponent {
  @Input() completedCount = 0;
  @Input() totalCount = 0;
}
