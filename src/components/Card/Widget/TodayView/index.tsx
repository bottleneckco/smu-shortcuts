import React, { useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';

import CurrentEvent from './components/CurrentEvent';
import { useDataContext } from '../../../../contexts/DataContext';

import Template from '../../components/CardTemplate';

const Wrapper = styled(Template)``;

const TodayView: React.FC = () => {
  // const { currentEvent } = useDataContext();
  return (
    <Wrapper>
      <CurrentEvent />
    </Wrapper>
  );
};

export default TodayView;
