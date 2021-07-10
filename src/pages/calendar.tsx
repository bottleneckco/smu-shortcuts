import React from 'react';
import styled from 'styled-components';

import { CalendarList } from '../components/Card';
import DefaultLayout from '../layouts/DefaultLayout';

const Wrapper = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 64px);
  padding: 16px;
  display: flex;
  // grid-template-columns: 1fr 2fr;
  column-gap: 16px;
`;

export const Calendar: React.FC = () => {
  return (
    <DefaultLayout title="Calendar">
      <Wrapper>
        <CalendarList />
      </Wrapper>
    </DefaultLayout>
  );
};

export default Calendar;
