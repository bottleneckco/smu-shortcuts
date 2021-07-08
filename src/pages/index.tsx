import React from 'react';
import styled from 'styled-components';
import { TodayCard, CapacityCard, AppLibrary } from '../components/Card/';
import { BOSSTimetable } from '../components/Modal';

import { useRouter } from 'next/router';
import DefaultLayout from '../layouts/DefaultLayout';
import { isArray } from 'lodash';

const Wrapper = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 64px);
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 16px;
`;

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Home: React.FC = () => {
  const router = useRouter();
  const path = router.asPath.match(/#([a-z0-9-]+)/gi);
  const isExportModal = isArray(path) && path[0] === '#boss-export';

  return (
    <DefaultLayout title="Home">
      <Wrapper>
        <WidgetContainer>
          <TodayCard />
          <CapacityCard />
        </WidgetContainer>
        <AppLibrary />
      </Wrapper>
      {isExportModal && <BOSSTimetable />}
    </DefaultLayout>
  );
};

export default Home;
