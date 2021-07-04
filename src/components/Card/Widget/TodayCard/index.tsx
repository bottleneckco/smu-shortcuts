import React from 'react';
import styled from 'styled-components';

import { CardTemplate } from '../../styled';
import TodayEvent from './components/TodayEvent';
import CalendarEvent from './components/CalendarEvents';

const Wrapper = styled(CardTemplate)``;

const TodayCard: React.FC = () => {
  return (
    <Wrapper>
      <TodayEvent />
      <CalendarEvent />
    </Wrapper>
  );
};

export default TodayCard;
