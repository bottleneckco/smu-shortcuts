export interface SchoolYearPropsV1 {
  '1': SchoolTermPropsV1;
  '2': SchoolTermPropsV1;
}

export interface SchoolTermPropsV1 {
  startdate: string;
  enddate: string;
  weeks: {
    id: string;
    startdate: string;
    enddate: string;
    name: string;
  }[];
}

export interface ImportantDateProps {
  summary: string;
  startTime: number;
  endTime: number;
}

export interface CurrentEventProps {
  title: string;
  days: number;
  isBreak: boolean;
  isLastDay: boolean;
}

export interface CalendarEventProps {
  title: string;
  timeString: string;
  startDate: number;
  endDate: number;
}

export interface LibraryOccupancy {
  title: string;
  occupancy: number;
  maxOccupancy: number;
}