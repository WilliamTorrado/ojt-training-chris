import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {

  logId: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.logId = this.route.snapshot.paramMap.get('id');
  }

}
