export interface timeTrackerDetails {
    description:string;
    timeHistoryList: timeDetails[];
    active:boolean;
  }
  
  export interface timeDetails {
    startTime: number;
    endTime:  number | null;
  }

  export interface time {
    hours:number;
    minutes:number;
    seconds:number
  }