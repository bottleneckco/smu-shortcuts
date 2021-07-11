import React from 'react';
import styled from 'styled-components';

import AppNav from './components/AppNav';
import Settings from './components/Settings';

const Wrapper = styled.div`
  height: 100%;
  width: 80px;
  padding: 24px 0;
  box-sizing: border-box;
  background: ${(props) => props.theme.blur.backgroundBackwards};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @supports (backdrop-filter: ${(props) => props.theme.blur.blur}) {
    background: ${(props) => props.theme.blur.background};
    backdrop-filter: ${(props) => props.theme.blur.blur};
  }

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    position: absolute;
    z-index: 6;
    width: 92px;
  }
`;

interface Props {
  hideNavigation?: () => void;
}

const NavBar: React.FC<Props> = (props) => {
  const { hideNavigation } = props;

  return (
    <Wrapper>
      <AppNav hideNavigation={hideNavigation} />
      <Settings />
    </Wrapper>
  );
};

export default NavBar;
