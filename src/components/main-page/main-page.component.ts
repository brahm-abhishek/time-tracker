import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { timeTrackerDetails } from '../../model/track-detail';
import { TimeTrackerService } from '../../services/time-tracker.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit {
  @ViewChild(DialogComponent)
  dialogBox!: DialogComponent;

  timmeTrackerDetailList!: timeTrackerDetails[];
  isOpen: boolean = false;

  constructor(private timeTrackerService: TimeTrackerService) {}

  ngOnInit(): void {
    this.getTimeTrackerList();
  }

  openDialog(isOpen: boolean): void {
    this.dialogBox.isOpen = isOpen;
  }

  getDescription($event: string): void {
    this.timeTrackerService.addNewTimeTracker($event);
  }

  getTimeTrackerList(): void {
    this.timmeTrackerDetailList = this.timeTrackerService.gettimeTrackerList();
  }
}
