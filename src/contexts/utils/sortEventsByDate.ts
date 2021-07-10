import orderBy from 'lodash/orderBy';
import moment from 'moment-timezone';

import {
  CalendarEventProps,
  CalendarProps,
  ImportantDateProps,
} from '../../Schema';

export default function sortEventsByDate(
  dates: ImportantDateProps[]
): CalendarProps {
  const splitEvents: CalendarProps = {};
  const sortedDates = orderBy(dates, 'startTime', ['asc']);

  let earliestTime = moment.unix(sortedDates[0].startTime);
  const latestTime = moment.unix(
    orderBy(dates, 'endTime', ['desc'])[0].endTime
  );

  while (earliestTime <= latestTime) {
    const events: CalendarEventProps[] = [];
    const midnight = moment(earliestTime).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    const nextMidnight = moment(midnight).add(1, 'day');

    const filteredEvents = sortedDates.filter((date) =>
      earliestTime.isBetween(
        moment.unix(date.startTime),
        moment.unix(date.endTime),
        undefined,
        '[)'
      )
    );

    filteredEvents.map((date) => {
      const startTime = moment.unix(date.startTime);
      const endTime = moment.unix(date.endTime);
      const startTimeFormat = startTime.minute() === 0 ? 'ha' : 'h:mma';
      const endTimeFormat = endTime.minute() === 0 ? 'ha' : 'h:mma';
      const title = date.summary;

      switch (true) {
        // all-day event
        case midnight.isSameOrAfter(startTime) &&
          nextMidnight.isSameOrBefore(endTime):
          events.push({
            title,
            timeString: 'All day',
            startDate: midnight.unix(),
            endDate: nextMidnight.unix(),
          });
          break;

        // 0000 to < 2359
        case midnight.isSameOrAfter(startTime) && nextMidnight.isAfter(endTime):
          events.push({
            title,
            timeString: `12am - ${endTime.format(endTimeFormat)}`,
            startDate: midnight.unix(),
            endDate: date.endTime,
          });
          break;

        // > 0000 to 2359
        case midnight.isBefore(startTime) && nextMidnight.isBefore(endTime):
          events.push({
            title,
            timeString: `${startTime.format(startTimeFormat)} - 11:59pm`,
            startDate: date.startTime,
            endDate: nextMidnight.unix(),
          });
          break;

        // between 0000 to 2359
        default:
          events.push({
            title,
            timeString: `${startTime.format(
              startTimeFormat
            )} - ${endTime.format(endTimeFormat)}`,
            startDate: date.startTime,
            endDate: date.endTime,
          });
          break;
      }
    });

    if (events.length > 0) {
      splitEvents[`${midnight.unix()}`] = events;
    }
    earliestTime = nextMidnight;
  }
  return splitEvents;
}
