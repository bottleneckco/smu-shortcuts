import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import Icon from '../../Icon';
import NavLink from './NavLink';

interface Props {
  hideNavigation?: () => void;
}

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: auto;
  row-gap: 16px;
`;

const StyledLink = styled(NavLink)`
  height: 48px;
  width: 48px;
  text-decoration: none;
  color: ${(props) => props.theme.icon.color};
  background-color: ${(props) => props.theme.icon.background};

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;

  &.active {
    box-shadow: ${(props) => props.theme.primary.blue} 0px 0px 0px 3px;
    transform: scale(1);
  }

  &:hover {
    box-shadow: ${(props) => props.theme.text300}AA 0px 0px 0px 3px;
    transform: scale(1);
  }
`;

const AppNav: React.FC<Props> = (props) => {
  const { hideNavigation } = props;
  const router = useRouter();
  const path = router.asPath;

  return (
    <Wrapper>
      <div onClick={hideNavigation}>
        <StyledLink href="/" className={path === '/' ? 'active' : ''}>
          <Icon name="smushortcut" width={30} height={30} />
        </StyledLink>
      </div>

      <div onClick={hideNavigation}>
        <StyledLink
          href="/calendar"
          className={path === '/calendar' ? 'active' : ''}
        >
          <Icon name="today" />
        </StyledLink>
      </div>
    </Wrapper>
  );
};

export default AppNav;
