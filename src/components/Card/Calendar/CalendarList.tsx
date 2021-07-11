import moment from 'moment-timezone';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { useDataContext } from '../../../contexts/DataContext';
import { CardTemplate } from '../../Card/styled';
import EventSection from './components/EventsSection';

const Wrapper = styled(CardTemplate)`
  width: 100%;
  padding: 24px 32px;
  overflow-y: auto;

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    padding: 16px;
    height: unset;
    overflow-y: unset;
  }
`;

const CalendarList: React.FC = () => {
  const { calendarEvents } = useDataContext();
  const todayMidnight = moment().set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  const futureEventsKeys = useMemo(() => {
    const dateKeys = Object.keys(calendarEvents);
    return dateKeys.filter((key) => Number(key) > todayMidnight.unix());
  }, [calendarEvents, todayMidnight]);

  return (
    <Wrapper>
      <EventSection title="Today" dates={[`${todayMidnight.unix()}`]} />
      <EventSection title="Upcoming" dates={futureEventsKeys} />
    </Wrapper>
  );
};

export default CalendarList;
