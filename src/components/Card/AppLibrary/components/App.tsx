import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { AppLibraryShortcutsProps } from '../../../../Schema';
import Icon from '../../../Icon';

interface Props {
  shortcut: AppLibraryShortcutsProps;
}

const Wrapper = styled.a`
  padding: 0 16px;
  height: 64px;
  background-color: ${(props) => props.theme.appLibraryBackground};
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props) => props.theme.appLibraryIcon};
  cursor: pointer;

  p {
    margin: 0;
    padding-left: 8px;
    font-weight: 600;
    font-size: 1.1em;
  }

  .material-icons-round {
    font-size: 36px;
    font-weight: normal;
  }

  :hover {
    background-color: ${(props) => props.theme.primary}27;
    color: ${(props) => props.theme.primary};
  }
`;

const App: React.FC<Props> = (props) => {
  const {
    shortcut: { title, logo, type, link },
  } = props;
  const router = useRouter();

  const handleClick = useCallback(() => {
    switch (type) {
      case 'internal':
        router.push(`/${link}`);
        break;
      default:
        router.push(link);
    }
  }, [type, router, link]);

  return (
    <Wrapper onClick={handleClick}>
      <Icon name={logo} width={30} height={30} />
      <p>{title}</p>
    </Wrapper>
  );
};

export default App;
