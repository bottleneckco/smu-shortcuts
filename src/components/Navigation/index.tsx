import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import Icon from '../Icon';
import NavLink from './components/NavLink';

const Wrapper = styled.div`
  height: 100%;
  width: 80px;
  padding-top: 16px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.sidebarBackground};
  background: ${(props) => props.theme.blurBackgroundBackwardsCompatible};

  @supports (backdrop-filter: ${(props) => props.theme.blur}) {
    background: ${(props) => props.theme.blurBackground};
    backdrop-filter: ${(props) => props.theme.blur};
  }

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    position: absolute;
    z-index: 6;
    width: 92px;
  }
`;

const NavContainer = styled.div`
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

interface Props {
  hideNavigation?: () => void;
}

const NavBar: React.FC<Props> = (props) => {
  const { hideNavigation } = props;
  const router = useRouter();
  const path = router.asPath;

  return (
    <Wrapper>
      <NavContainer>
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
      </NavContainer>
    </Wrapper>
  );
};

export default NavBar;
