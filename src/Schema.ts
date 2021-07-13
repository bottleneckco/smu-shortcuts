export interface SchoolYearProps {
  label: string;
  terms: SchoolTermProp[];
}

export interface SchoolTermProp {
  type: string;
  label: string;
  periods: {
    type: string;
    date_start: string;
    date_end: string;
  }[];
}

export interface ImportantDateProps {
  summary: string;
  startTime: number;
  endTime: number;
}

export interface CurrentEventProps {
  type: string;
  date_start: number;
  date_end: number;
}

export interface CalendarEventProps {
  title: string;
  timeString: string;
  startDate: number;
  endDate: number;
}

export interface LibraryOccupancyProps {
  title: string;
  occupancy: number;
  maxOccupancy: number;
}

export interface AppLibraryShortcutsProps {
  id: string;
  title: string;
  logo: string;
  type: string;
  link: string;
}

export interface AppLibraryProps {
  uid: string;
  title: string;
  shortcuts: AppLibraryShortcutsProps[];
}

export interface CalendarProps {
  [key: string]: CalendarEventProps[];
}
