import { isArray } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { AppLibrary, CapacityCard, TodayCard } from '../components/Card/';
import { BOSSTimetable, SchoolGuide, WelcomeGuide } from '../components/Modal';
import DefaultLayout from '../layouts/DefaultLayout';

const Wrapper = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 64px);
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 16px;

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: calc(100vh - 56px);
  }
`;

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Home: React.FC = () => {
  const router = useRouter();
  const path = router.asPath.match(/#([a-z0-9-]+)/gi);
  const isExportModal = isArray(path) && path[0] === '#boss-export';
  const isWelcomeGuide = isArray(path) && path[0] === '#welcome-guide';
  const isSchoolGuide = isArray(path) && path[0] === '#school-guide';

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
      {isWelcomeGuide && <WelcomeGuide />}
      {isSchoolGuide && <SchoolGuide />}
    </DefaultLayout>
  );
};

export default Home;
