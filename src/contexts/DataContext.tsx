import axios from 'axios';
import moment from 'moment-timezone';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  AppLibraryProps,
  CurrentEventProps,
  ImportantDateProps,
  SchoolTermPropsV1,
  SchoolYearPropsV1,
} from '../Schema';
import { APP_BOOKMARK_DEFAULT } from '../utils/appBookmarkDefaults';

interface ContextProps {
  schoolTerms: SchoolYearPropsV1[];
  importantDates: ImportantDateProps[];
  currentEvent: CurrentEventProps | null;
  appBookmarks: AppLibraryProps;
  appLibrary: AppLibraryProps[];
}

const DataContext = createContext<ContextProps>({
  appBookmarks: APP_BOOKMARK_DEFAULT,
  appLibrary: [],
  schoolTerms: [],
  importantDates: [],
  currentEvent: null,
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
    if (schoolTerms.length === 0) {
      return null;
    }
    const today = moment();
    // look for current event in schoolTerms
    for (const year of schoolTerms) {
      for (const [key, value] of Object.entries(year)) {
        const term: SchoolTermPropsV1 = value;
        const termStart = moment.tz(
          `${term.startdate} 00:00`,
          'D MMM YYYY',
          'Asia/Singapore'
        );
        const termEnd = moment.tz(
          `${term.enddate} 23:59`,
          'D MMM YYYY',
          'Asia/Singapore'
        );

        // look for the current term and search for the current event
        if (termStart.isSameOrBefore(today) && termEnd.isAfter(today)) {
          const week = term.weeks.find((week) => {
            const weekStart = moment.tz(
              `${week.startdate} 00:00`,
              'D MMM YYYY',
              'Asia/Singapore'
            );
            const weekEnd = moment.tz(
              `${week.enddate} 00:00`,
              'D MMM YYYY',
              'Asia/Singapore'
            );
            return weekStart.isSameOrBefore(today) && weekEnd.isAfter(today);
          });

          if (week) {
            const weekStart = moment.tz(
              `${week.startdate} 00:00`,
              'D MMM YYYY',
              'Asia/Singapore'
            );
            const weekEnd = moment.tz(
              `${week.enddate} 00:00`,
              'D MMM YYYY',
              'Asia/Singapore'
            );
            const title = week.name;
            const days = today.diff(weekStart, 'days');
            const daysToEnd = weekEnd.diff(today, 'days');
            return {
              title,
              days: days + 1,
              isBreak: title === 'Vacation' || title === 'Recess',
              isLastDay: daysToEnd === 0,
            };
          }
        }
      }
    }
    return null;
  }, [schoolTerms]);

  const sharedState = useMemo(
    () => ({
      appLibrary,
      appBookmarks,
      schoolTerms,
      importantDates,
      currentEvent,
    }),
    [appBookmarks, appLibrary, currentEvent, importantDates, schoolTerms]
  );

  return (
    <DataContext.Provider value={sharedState}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
