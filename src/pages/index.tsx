import React from 'react';
import styled from 'styled-components';
import { CardTemplate, TodayWidget } from '../components/Card/';

import DefaultLayout from '../layouts/DefaultLayout';

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 16px;
`;

const WidgetContainer = styled.div`
  height: 100%;
`;

export const Home: React.FC = () => {
  return (
    <DefaultLayout title="Home">
      <Wrapper>
        <WidgetContainer>
          <TodayWidget />
        </WidgetContainer>
        <CardTemplate>Kek</CardTemplate>
      </Wrapper>
    </DefaultLayout>
  );
};

export default Home;
