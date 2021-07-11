import moment from 'moment-timezone';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { useDataContext } from '../../../../contexts/DataContext';
import { CalendarEventProps } from '../../../../Schema';

interface Props {
  title: string;
  dates: string[];
}

interface EventsListProps {
  title: string;
  events: CalendarEventProps[];
}

const Wrapper = styled.div`
  padding-bottom: 12px;
  h1 {
    margin: 0;
    padding-bottom: 4px;
    font-size: 1.2em;
    font-weight: 700;
    color: ${(props) => props.theme.text900};
    margin-bottom: 12px;
  }
`;

const SubTitle = styled.h2`
  margin: 0;
  font-size: 1.05em;
  font-weight: 600;
  color: ${(props) => props.theme.text600};
`;

const CalendarRow = styled.div`
  background-color: ${(props) => props.theme.calendar.red};
  border-radius: 12px;
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

const DailyWrapper = styled.div`
  padding-bottom: 16px;
  .calendar {
    padding: 8px 0;
  }
`;

const EventSection: React.FC<Props> = (props) => {
  const { title, dates } = props;
  const { calendarEvents } = useDataContext();

  const eventsList = useMemo(() => {
    return dates.map((date) => {
      const events = calendarEvents[date];
      return {
        title: date,
        events: !events ? [] : events,
      };
    });
  }, [calendarEvents, dates]);

  return (
    <Wrapper>
      <h1>{title}</h1>
      {eventsList.map((day, index) => (
        <EventsList title={day.title} events={day.events} key={index} />
      ))}
    </Wrapper>
  );
};

const EventsList: React.FC<EventsListProps> = (props) => {
  const { title, events } = props;
  const date = moment.unix(Number(title));

  return (
    <DailyWrapper>
      <SubTitle>{date.format('dddd, D MMMM')}</SubTitle>
      <div className="calendar">
        {events.map((event, index) => (
          <CalendarRow key={index}>
            <h3>{event.title}</h3>
            <p>{event.timeString}</p>
          </CalendarRow>
        ))}
      </div>
    </DailyWrapper>
  );
};

export default EventSection;
