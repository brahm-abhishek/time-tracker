import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import {
  time,
  timeDetails,
  timeTrackerDetails,
} from '../../model/track-detail';
import { TimeTrackerService } from '../../services/time-tracker.service';

@Component({
  selector: 'app-timer-card',
  templateUrl: './timer-card.component.html',
  styleUrl: './timer-card.component.css',
})
export class TimerCardComponent implements OnInit, OnDestroy {

  @Input({ required: true }) timeTrackerDetail!: timeTrackerDetails;

  timer = interval(1000);

  timerSubscription!: Subscription;

  totalTimeCount!: time;

  constructor(private timeTrackerService: TimeTrackerService) {}

  ngOnInit(): void {
    let totalMiliSecond = this.timeTrackerService.getTimeDifference(this.timeTrackerDetail)
    this.totalTimeCount = this.timeTrackerService.timercount(totalMiliSecond);
    if (this.timeTrackerDetail.active) {
      this.startTimer();
    }
  }

  saveTimerData(): void {
    this.timeTrackerService.saveTimerHistory(
      true,
      {
        startTime: new Date().getTime(),
        endTime: null,
      },
      this.timeTrackerDetail
    );
  }

  startTimer(): void {
    if (!this.timeTrackerDetail.active) {
      this.saveTimerData();
    }
    this.timerSubscription = this.timer.subscribe(() => {
      this.totalTimeCount.seconds++;
      if (this.totalTimeCount.seconds === 60) {
        this.totalTimeCount.seconds = 0;
        this.totalTimeCount.minutes++;
      }
      if (this.totalTimeCount.minutes === 60) {
        this.totalTimeCount.minutes = 0;
        this.totalTimeCount.hours++;
      }
    });
  }

  endTimer(): void {
    this.timerSubscription.unsubscribe();
    const timeDetails: timeDetails = {
      startTime: this.timeTrackerDetail.timeHistoryList[0].startTime,
      endTime: new Date().getTime(),
    };
    this.timeTrackerService.saveTimerHistory(
      false,
      timeDetails,
      this.timeTrackerDetail
    );
  }

  deleteTimeTracker() {
    let confirm = window.confirm('Are you sure you Want to delete !');
    if (confirm) {
      this.timeTrackerService.deleteTimerData(this.timeTrackerDetail)
    }
  }

  ngOnDestroy(): void {
     this.timerSubscription.unsubscribe();
  }
}
