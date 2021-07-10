import axios from 'axios';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  AppLibraryProps,
  CalendarProps,
  CurrentEventProps,
  ImportantDateProps,
  SchoolYearPropsV1,
} from '../Schema';
import { APP_BOOKMARK_DEFAULT } from '../utils/appBookmarkDefaults';
import { getCurrentEvent, sortEventsByDate } from './utils';

interface ContextProps {
  schoolTerms: SchoolYearPropsV1[];
  calendarEvents: CalendarProps;
  currentEvent: CurrentEventProps | null;
  appBookmarks: AppLibraryProps;
  appLibrary: AppLibraryProps[];
}

const DataContext = createContext<ContextProps>({
  appBookmarks: APP_BOOKMARK_DEFAULT,
  appLibrary: [],
  schoolTerms: [],
  currentEvent: null,
  calendarEvents: {},
});

export const DataWrapper: React.FC = (props) => {
  const { children } = props;
  const [appBookmarks] = useState<AppLibraryProps>(APP_BOOKMARK_DEFAULT);
  const [appLibrary, setAppLibrary] = useState<AppLibraryProps[]>([]);
  const [schoolTerms, setSchoolTerms] = useState<SchoolYearPropsV1[]>([]);
  const [importantDates, setImportantDates] = useState<ImportantDateProps[]>(
    []
  );

  useEffect(() => {
    getSchoolTerm();
    getImportantDates();
    getAppLibrary();
  }, []);

  /** Get school terms */
  const getSchoolTerm = async () =>
    axios(`${process.env.SERVER_URL}` + '/sch_terms.json')
      .then((response) => {
        const terms: SchoolYearPropsV1[] = response.data;
        setSchoolTerms(terms);
      })
      .catch((error) => {
        console.log('sch terms:', error);
      });

  /** Get important dates */
  const getImportantDates = async () =>
    // axios(`${process.env.SERVER_URL}` + '/important_dates.json')
    axios('/temp/important_dates.json')
      .then((response) => {
        const dates: ImportantDateProps[] = response.data;
        setImportantDates(dates);
      })
      .catch((error) => {
        console.log('important dates:', error);
      });

  /** Get app library */
  const getAppLibrary = async () =>
    axios('/data/apps.json')
      .then((response) => {
        const results: AppLibraryProps[] = response.data.result;
        setAppLibrary(results);
      })
      .catch((error) => {
        console.log('app library', error);
      });

  /** Get today details */
  const currentEvent: CurrentEventProps | null = useMemo(() => {
    return getCurrentEvent(schoolTerms);
  }, [schoolTerms]);

  /** Split Important Dates by date */
  const calendarEvents: CalendarProps = useMemo(() => {
    if (importantDates.length === 0) {
      return {};
    }
    return sortEventsByDate(importantDates);
  }, [importantDates]);

  const sharedState = useMemo(
    () => ({
      appLibrary,
      appBookmarks,
      schoolTerms,
      calendarEvents,
      currentEvent,
    }),
    [appBookmarks, appLibrary, calendarEvents, currentEvent, schoolTerms]
  );

  return (
    <DataContext.Provider value={sharedState}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
