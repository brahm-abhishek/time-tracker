import { Injectable } from '@angular/core';
import { TIME_TRACKER_DETAILS_List } from '../db-data';
import { time, timeDetails, timeTrackerDetails } from '../model/track-detail';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackerService{

  timeTrackerDataList: timeTrackerDetails[]  = TIME_TRACKER_DETAILS_List;

  constructor() {
    const data = localStorage.getItem("itemTrackerDataList")
    if(data){
      this.timeTrackerDataList = JSON.parse(data) as timeTrackerDetails[];
    } else {
      this.setLocalStorageData(this.timeTrackerDataList)
    }
  }

  addNewTimeTracker(description: string) {
    this.timeTrackerDataList.push({
      description,
      active: false,
      timeHistoryList: [],
    });
    this.setLocalStorageData(this.timeTrackerDataList)
  }

  gettimeTrackerList(): timeTrackerDetails[] {
    return this.timeTrackerDataList;
  }

  private setLocalStorageData(timeTrackerDetails:timeTrackerDetails[]){
    localStorage.setItem("itemTrackerDataList", JSON.stringify(timeTrackerDetails));
  }

  /** convert millisecond to Hr minutes and seconds */
  timercount(milliSecond: number): time {
    let hours = Math.floor(milliSecond / (1000 * 60 * 60));
    let remainingMilliseconds = milliSecond % (1000 * 60 * 60);
    let minutes = Math.floor(remainingMilliseconds / (1000 * 60));
    remainingMilliseconds = remainingMilliseconds % (1000 * 60);
    let seconds = Math.floor(remainingMilliseconds / 1000);
    return { hours, minutes, seconds };
  }

  /** Calculate Total milliSeconds */
  getTimeDifference(timeTrackerDetails: timeTrackerDetails): number {
    let timeDifferenceInMilliseconds =
      timeTrackerDetails.timeHistoryList.reduce((total: number, obj: any) => {
        if (obj?.startTime && obj?.endTime) {
          return (total = total + (obj.endTime - obj.startTime));
        } else if (obj?.startTime && obj?.endTime === null) {
          return (total = total + (new Date().getTime() - obj.startTime));
        }
        return total;
      }, 0);
    return timeDifferenceInMilliseconds;
  }

  saveTimerHistory(
    active: boolean,
    timeHistory: timeDetails,
    timeTrackerDetail: timeTrackerDetails
  ): boolean {
    let index = this.timeTrackerDataList.findIndex(
      (item: timeTrackerDetails) =>
        item.description === timeTrackerDetail.description
    );
    if (index >= 0) {
      this.timeTrackerDataList[index].active = active;
      if (active) {
        this.timeTrackerDataList[index].timeHistoryList.unshift(timeHistory);
      } else {
        this.timeTrackerDataList[index].timeHistoryList.shift();
        this.timeTrackerDataList[index].timeHistoryList.unshift(timeHistory);
      }
      this.setLocalStorageData(this.timeTrackerDataList);
      return true;
    }
    return false;
  }

  deleteTimerData(timeTrackerDetail: timeTrackerDetails) {
    let index = this.timeTrackerDataList.findIndex(
      (element: timeTrackerDetails) =>
        element.description === timeTrackerDetail.description
    );
    if (index >= 0) {
      this.timeTrackerDataList.splice(index, 1);
      this.setLocalStorageData(this.timeTrackerDataList);
    }
  }

  isDescriptionExist(description: string) : boolean {
    return this.timeTrackerDataList.some(
      (item: timeTrackerDetails) =>
        item.description.trim().toLowerCase() ===
        description.trim().toLowerCase()
    );
  }

  totalTimeSpend(){
      let totalMilliSec = 0;
      this.timeTrackerDataList.forEach((element:timeTrackerDetails) => {
          totalMilliSec += this.getTimeDifference(element)
      })
      return this.timercount(totalMilliSec)
  }
}
