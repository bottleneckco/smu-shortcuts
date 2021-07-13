import moment from 'moment-timezone';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { useDataContext } from '../../../../../contexts/DataContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
  color: ${(props) => props.theme.text900};

  h1 {
    margin: 0;
    font-size: 2.6rem;
    font-weight: 00;
    line-height: 96%;
  }

  span {
    font-weight: 600;
    padding: 0 8px;
    font-size: 1.5em;
  }

  .highlight {
    color: ${(props) => props.theme.primary.blue};
  }
`;

const DaysWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-bottom: 8px;
`;

const TodayEvent: React.FC = () => {
  const { currentEvent } = useDataContext();

  const event = useMemo(() => {
    if (!currentEvent) {
      return null;
    }

    const today = moment();
    const startDate = moment.unix(currentEvent.date_start);
    const endDate = moment.unix(currentEvent.date_end);
    const isLastDay = endDate.diff(today, 'days') === 0;

    let title = currentEvent.type;
    let days = 0;

    switch (currentEvent.type) {
      case 'recess':
      case 'vacation':
        days = today.diff(startDate, 'days') + 1;
        break;
      default:
        title = `Week ${today.diff(startDate, 'week') + 1}`;
    }

    return {
      title: title.toUpperCase(),
      days,
      isLastDay,
    };
  }, [currentEvent]);

  if (!currentEvent || !event) {
    return null;
  }

  return currentEvent.type !== 'recess' && currentEvent.type !== 'vacation' ? (
    <Wrapper>
      <h1 className="highlight">{event.title}</h1>
    </Wrapper>
  ) : (
    <Wrapper>
      <DaysWrapper>
        {!event.isLastDay ? <h1>DAY {event.days}</h1> : <h1>Last Day</h1>}
        <span>OF</span>
      </DaysWrapper>
      <h1 className="highlight">{event.title.toUpperCase()}</h1>
    </Wrapper>
  );
};

export default TodayEvent;
