import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeTrackerService } from '../../services/time-tracker.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  @Output() description = new EventEmitter<string>();

  isOpen: boolean = false;
  isError: boolean = false;
  isDisabled: boolean = true;

  constructor(private timeTrackerService: TimeTrackerService) {}

  closeDialog(isopen: boolean, description: string) {
    if (!this.timeTrackerService.isDescriptionExist(description)) {
      this.isOpen = false;
      this.isDisabled = true;
      this.isError = false;
      this.description.emit(description);
    } else {
      this.isError = true;
      this.isDisabled = true;
    }
  }

  change($event: any) {
    this.isDisabled = $event.target.value.trim() === '';
  }
}
