import { sortBy } from 'lodash';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { AppLibraryShortcutsProps } from '../../../../Schema';
import App from './App';

interface Props {
  title: string;
  isSorted?: boolean;
  shortcuts: AppLibraryShortcutsProps[];
}

const Wrapper = styled.div`
  h2 {
    margin: 0;
    font-size: 1.15em;
    font-weight: 700;
    color: ${(props) => props.theme.text600};
    padding-bottom: 4px;
  }

  padding-bottom: 24px;
`;

const AppWrapper = styled.div`
  padding-top: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;

  @supports not (gap: 12px) with (display: flex) {
    margin-bottom: 12px;
    margin-right: 12px;
  }
`;

const Section: React.FC<Props> = (props) => {
  const { title, shortcuts, isSorted = true } = props;

  const shortcutsSort = useMemo(
    () => (!isSorted ? shortcuts : sortBy(shortcuts, 'title')),
    [isSorted, shortcuts]
  );

  if (shortcuts.length === 0) {
    return null;
  }

  return (
    <Wrapper>
      <h2>{title}</h2>
      <AppWrapper>
        {shortcutsSort.map((shortcut) => (
          <App key={shortcut.id} shortcut={shortcut} />
        ))}
      </AppWrapper>
    </Wrapper>
  );
};

export default Section;
