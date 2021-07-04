import axios from 'axios';
import moment from 'moment-timezone';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  SchoolYearPropsV1,
  SchoolTermPropsV1,
  ImportantDateProps,
  CurrentEventProps,
} from '../Schema';

interface ContextProps {
  schoolTerms: SchoolYearPropsV1[];
  importantDates: ImportantDateProps[];
  currentEvent: CurrentEventProps | null;
}

const DataContext = createContext<ContextProps>({
  schoolTerms: [],
  importantDates: [],
  currentEvent: null,
});

export const DataWrapper: React.FC = (props) => {
  const { children } = props;
  const [schoolTerms, setSchoolTerms] = useState<SchoolYearPropsV1[]>([]);
  const [importantDates, setImportantDates] = useState<ImportantDateProps[]>(
    []
  );

  // Get school terms
  useEffect(() => {
    const getSchoolTerm = async () =>
      axios(`${process.env.SERVER_URL}` + '/sch_terms.json')
        .then((response) => {
          const terms: SchoolYearPropsV1[] = response.data;
          setSchoolTerms(terms);
        })
        .catch((error) => {
          console.log('sch terms:', error);
        });

    getSchoolTerm();
  }, []);

  // Get Important Dates
  useEffect(() => {
    const getImportantDates = async () => {
      // axios(`${process.env.SERVER_URL}` + '/important_dates.json')
      axios('/temp/important_dates.json')
        .then((response) => {
          const dates: ImportantDateProps[] = response.data;
          setImportantDates(dates);
        })
        .catch((error) => {
          console.log('important dates:', error);
        });
    };

    getImportantDates();
  }, []);

  // Get Current Event
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
      schoolTerms,
      importantDates,
      currentEvent,
    }),
    [currentEvent, importantDates, schoolTerms]
  );

  return (
    <DataContext.Provider value={sharedState}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
