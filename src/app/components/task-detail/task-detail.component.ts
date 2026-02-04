import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
taskId!: number;
  task: any;

  private allTasks = [
    { id: 1, description: 'Finalize Pathfinder Documentation', priority: 'high', deadline: new Date(2026, 1, 10), longDescription: 'Prepare the technical documentation and RAD model breakdown for final submission.', category: 'Documentation' },
    { id: 2, description: 'Review Angular Routing concepts', priority: 'medium', deadline: new Date(2026, 1, 15), longDescription: 'Master the use of router-outlet, child routes, and route parameters for the internship app.', category: 'Development' },
    { id: 3, description: 'Prepare for Graduation Pictorial', priority: 'low', deadline: new Date(2026, 2, 1), longDescription: 'Organize formal attire and ensure the Pathfinder app is ready for demo photos.', category: 'Personal' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = +params['id']; // The '+' converts the string to a number
      this.task = this.allTasks.find(t => t.id === this.taskId);
    });
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }

}
