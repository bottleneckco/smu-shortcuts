import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import Icon from '../Icon';
import NavLink from './components/NavLink';

const Wrapper = styled.div`
  height: 100%;
  width: 80px;
  padding-top: 16px;
  background-color: ${(props) => props.theme.sidebarBackground};
  box-sizing: border-box;
  backdrop-filter: blur(15px);
`;

const NavContaner = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: auto;
  row-gap: 16px;
`;

const StyledLink = styled(NavLink)`
  height: 48px;
  width: 48px;
  text-decoration: none;
  color: ${(props) => props.theme.sidebarIcon};
  background-color: ${(props) => props.theme.sidebarIconBackground};

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;

  &.active {
    box-shadow: ${(props) => props.theme.primary} 0px 0px 0px 3px;
    transform: scale(1);
  }

  &:hover {
    box-shadow: ${(props) => props.theme.text300}AA 0px 0px 0px 3px;
    transform: scale(1);
  }
`;

const NavBar: React.FC = () => {
  const router = useRouter();
  const path = router.asPath;
  return (
    <Wrapper>
      <NavContaner>
        <StyledLink href="/" className={path === '/' ? 'active' : ''}>
          <Icon name="smushortcut" width={32} height={32} />
        </StyledLink>
        <StyledLink
          href="/calendar"
          className={path === '/calendar' ? 'active' : ''}
        >
          <Icon name="today" />
        </StyledLink>
      </NavContaner>
    </Wrapper>
  );
};

export default NavBar;
