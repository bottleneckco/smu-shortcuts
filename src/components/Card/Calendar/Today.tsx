import React from 'react';
import styled from 'styled-components';

import { CardTemplate } from '../styled';
import TodayEvent from '../Widget/TodayCard/components/TodayEvent';
import CalendarRow from './components/CalendarRow';

const Wrapper = styled(CardTemplate)``;

const CalendarInformation = styled.div`
  margin-top: 60px;
  h1 {
    margin: 0;
    font-size: 1.2em;
  }
`;

const TodayCard: React.FC = () => {
  return (
    <Wrapper>
      <TodayEvent />
      <CalendarInformation>
        <h1>Calendar</h1>
        <CalendarRow title="SMU Critical Date" />
      </CalendarInformation>
    </Wrapper>
  );
};

export default TodayCard;
