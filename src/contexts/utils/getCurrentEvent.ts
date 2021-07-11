import moment from 'moment-timezone';

import {
  CurrentEventProps,
  SchoolTermPropsV1,
  SchoolYearPropsV1,
} from '../../Schema';

export default function getCurrentEvent(
  schoolTerms: SchoolYearPropsV1[]
): CurrentEventProps | null {
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
}
