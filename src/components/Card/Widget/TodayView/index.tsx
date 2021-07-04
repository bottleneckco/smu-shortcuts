import React, { useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';

import Template from '../../components/CardTemplate';
import TodayEvent from './components/TodayEvent';
import CalendarEvent from './components/CalendarEvents';

const Wrapper = styled(Template)``;

const TodayView: React.FC = () => {
  // const { currentEvent } = useDataContext();
  return (
    <Wrapper>
      <TodayEvent />
      <CalendarEvent />
    </Wrapper>
  );
};

export default TodayView;
