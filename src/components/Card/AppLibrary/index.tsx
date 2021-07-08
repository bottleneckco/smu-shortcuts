import React from 'react';
import styled from 'styled-components';

import { useDataContext } from '../../../contexts/DataContext';
import { CardTemplate } from '../styled';
import Section from './components/Section';

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
