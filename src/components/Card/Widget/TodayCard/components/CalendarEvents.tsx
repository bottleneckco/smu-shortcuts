import React from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';
import sortBy from 'lodash/sortBy';

import { useDataContext } from '../../../../../contexts/DataContext';
import { CalendarEventProps } from '../../../../../Schema';
import { useMemo } from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.h2`
  margin: 0;
  font-size: 1.15em;
  font-weight: 600;
  color: ${(props) => props.theme.subtitleColor};
  padding-bottom: 4px;
`;

const CalendarRow = styled.div`
  background-color: ${(props) => props.theme.calendarRed};
  border-radius: 8px;
  padding: 6px 12px;
  margin-top: 4px;

  h3,
  p {
    font-size: 0.8em;
    margin: 0;
    color: #ffffff;
  }

  h3 {
    font-weight: 600;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    overflow: hidden;
  }
`;

const MoreEvents = styled.p`
  font-size: 0.8em;
  margin: 0;
  margin-top: 8px;
`;

const CalendarEvents: React.FC = () => {
  const { importantDates } = useDataContext();

  const today = useMemo(() => {
    const now = moment();
    const todayMidnight = moment(now).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    return {
      now,
      todayMidnight,
      nextMidnight: moment(todayMidnight).add(1, 'day'),
    };
  }, []);

  const todayEvents = useMemo(() => {
    // get currently happening events
    const events = importantDates.filter((date) => {
      const startTime = moment.unix(date.startTime);
      const endTime = moment.unix(date.endTime);
      return today.now.isBetween(startTime, endTime, undefined, '[)');
    });
    // get events type
    const calendarEvents: CalendarEventProps[] = events.map((date) => {
      const startTime = moment.unix(date.startTime);
      const endTime = moment.unix(date.endTime);
      const startTimeFormat = startTime.minute() === 0 ? 'ha' : 'h:mma';
      const endTimeFormat = endTime.minute() === 0 ? 'ha' : 'h:mma';
      const title = date.summary;
      let timeString = '';

      switch (true) {
        // all-day event
        case today.todayMidnight.isSameOrAfter(startTime) &&
          today.nextMidnight.isSameOrBefore(endTime):
          return {
            title,
            timeString: 'All day',
            startDate: today.todayMidnight.unix(),
            endDate: today.nextMidnight.unix(),
          };
        // 0000 to < 2359
        case today.todayMidnight.isSameOrAfter(startTime) &&
          today.nextMidnight.isAfter(endTime):
          timeString = `12am - ${endTime.format(endTimeFormat)}`;
          return {
            title,
            timeString,
            startDate: today.todayMidnight.unix(),
            endDate: date.endTime,
          };
        // > 0000 to 2359
        case today.todayMidnight.isBefore(startTime) &&
          today.nextMidnight.isSameOrBefore(endTime):
          timeString = `${startTime.format(startTimeFormat)} - 11:59pm`;
          return {
            title,
            timeString,
            startDate: date.startTime,
            endDate: today.nextMidnight.unix(),
          };
        // between 0000 to 2359
        default:
          return {
            title,
            timeString: `${startTime.format(
              startTimeFormat
            )} - ${endTime.format(endTimeFormat)}`,
            startDate: date.startTime,
            endDate: date.endTime,
          };
      }
    });
    // sorted events as sorted by start date
    return sortBy(calendarEvents, 'startDate', ['asc']);
  }, [importantDates, today]);

  const hiddenEventsCount = todayEvents.length > 3 ? todayEvents.length - 3 : 0;

  return (
    <Wrapper>
      <SubTitle>{today.now.format('dddd, D MMMM')}</SubTitle>
      {todayEvents.slice(0, 3).map((event, index) => (
        <CalendarRow key={index}>
          <h3>{event.title}</h3>
          <p>{event.timeString}</p>
        </CalendarRow>
      ))}
      {hiddenEventsCount > 0 && (
        <MoreEvents>
          +{hiddenEventsCount} more {hiddenEventsCount > 1 ? 'events' : 'event'}
        </MoreEvents>
      )}
    </Wrapper>
  );
};

export default CalendarEvents;
