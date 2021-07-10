import React from 'react';
import styled from 'styled-components';

import { CardTemplate } from '../../styled';
import CalendarEvent from './components/CalendarEvents';
import TodayEvent from './components/TodayEvent';

const Wrapper = styled(CardTemplate)`
  min-height: 200px;
`;

const TodayCard: React.FC = () => {
  return (
    <Wrapper>
      <TodayEvent />
      <CalendarEvent />
    </Wrapper>
  );
};

export default TodayCard;
