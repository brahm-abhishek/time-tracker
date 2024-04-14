import { timeTrackerDetails } from "./model/track-detail";

export const TIME_TRACKER_DETAILS_List: timeTrackerDetails[] = [
  {
    description: 'Adding Animations to the Website',
    active: false,
    timeHistoryList: [
      {
        startTime: 1713017547000,
        endTime: 1713017676000,
      },
      {
        startTime: 1713016706000,
        endTime:   1713016952000,
      },
    ],
  },
  {
    description: 'Create time Tracker website',
    active: true,
    timeHistoryList: [
      {
        startTime: 1713025800000,
        endTime: null,
      },
    ],
  }
];
