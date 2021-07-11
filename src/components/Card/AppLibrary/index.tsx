import React from 'react';
import styled from 'styled-components';

import { useDataContext } from '../../../contexts/DataContext';
import { CardTemplate } from '../styled';
import Section from './components/Section';

const Wrapper = styled(CardTemplate)`
  overflow-y: auto;

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    margin-top: 16px;
    overflow-y: unset;
  }
`;

const Padding = styled.div`
  padding: 2vh;
`;

const AppLibrary: React.FC = () => {
  const { appBookmarks, appLibrary } = useDataContext();
  return (
    <Wrapper>
      <Section
        shortcuts={appBookmarks.shortcuts}
        isSorted={false}
        title={appBookmarks.title}
      />
      <Padding />
      {appLibrary.map((library) => (
        <Section
          key={library.uid}
          shortcuts={library.shortcuts}
          title={library.title}
        />
      ))}
    </Wrapper>
  );
};

export default AppLibrary;
