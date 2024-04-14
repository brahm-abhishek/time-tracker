import { Component, OnInit } from '@angular/core';
import { TimeTrackerService } from '../../services/time-tracker.service';
import { time } from '../../model/track-detail';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  timeCount!:time;

  constructor(private timeTrackerService:TimeTrackerService){}

  ngOnInit(): void {
    this.timeCount = this.timeTrackerService.totalTimeSpend();
  }

}
