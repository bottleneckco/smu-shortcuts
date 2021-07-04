import React from 'react';
import styled from 'styled-components';
import { TodayCard, CapacityCard } from '../components/Card/';
import { CardTemplate } from '../components/Card/styled';

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
  display: flex;
  flex-direction: column;
`;

const AppContainer = styled(CardTemplate)``;

export const Home: React.FC = () => {
  return (
    <DefaultLayout title="Home">
      <Wrapper>
        <WidgetContainer>
          <TodayCard />
          <CapacityCard />
        </WidgetContainer>
        <AppContainer>Kek</AppContainer>
      </Wrapper>
    </DefaultLayout>
  );
};

export default Home;
