import React from 'react';

import Section from './components/Section';
import { useDataContext } from '../../../contexts/DataContext';
import styled from 'styled-components';

import { CardTemplate } from '../styled';

const Wrapper = styled(CardTemplate)`
  overflow-y: auto;
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
