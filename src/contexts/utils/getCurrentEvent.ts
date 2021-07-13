import moment from 'moment-timezone';

import { CurrentEventProps, SchoolYearProps } from '../../Schema';

export default function getCurrentEvent(
  years: SchoolYearProps[]
): CurrentEventProps | null {
  if (years.length === 0) {
    return null;
  }

  const today = moment();
  const allowedTerms = ['term_1', 'term_2'];

  for (const year of years) {
    for (const term of year.terms) {
      // check if term is part of the allowed terms
      if (!allowedTerms.includes(term.type)) {
        // console.log('not allowed');
        continue;
      }

      for (const period of term.periods) {
        // check if current date is within the period dates
        const startDate = moment.tz(
          period.date_start,
          'DD-MM-YYYY',
          'Asia/Singapore'
        );
        const endDate = moment.tz(
          period.date_end,
          'DD-MM-YYYY',
          'Asia/Singapore'
        );

        // date is between the period
        if (today.isBetween(startDate, endDate, undefined, '[)')) {
          return {
            type: period.type,
            date_start: startDate.unix(),
            date_end: endDate.unix(),
          };
        }
        // console.log('end of period', period.type);
      }
      // console.log('end of term', term.label);
    }
    // console.log('end of year', year.label);
  }
  return null;
}
