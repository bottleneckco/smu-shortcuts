import { useMediaQuery } from 'beautiful-react-hooks';
import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import { ModalOverlay } from '../components/Modal/styled';
import NavBar from '../components/Navigation';
import SEO from '../components/SEO';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;

  main {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

interface Props {
  title?: string;
}

const DefaultLayout: React.FC<Props> = function (props) {
  const { title = 'SMU Shortcuts', children } = props;
  const [showNav, setShowNav] = useState(false);
  const isMobile = useMediaQuery('screen and (max-width: 820px)');

  useEffect(() => {
    if (isMobile) {
      setShowNav(false);
    }
  }, [isMobile]);

  const handleShowNavBar = useCallback(() => {
    if (!isMobile) {
      return;
    }
    setShowNav(true);
  }, [isMobile]);

  const handleHideNavBar = useCallback(() => {
    if (!isMobile) {
      return;
    }
    setShowNav(false);
  }, [isMobile]);

  console.log(isMobile, showNav);

  return (
    <Wrapper>
      <SEO title={title} />
      {!isMobile ? (
        <NavBar hideNavigation={handleHideNavBar} />
      ) : (
        showNav && <NavBar hideNavigation={handleHideNavBar} />
      )}
      <main>
        <Header title={title} showNavigation={handleShowNavBar} />
        {children}
      </main>
      {isMobile && showNav && <ModalOverlay onClick={handleHideNavBar} />}
    </Wrapper>
  );
};

export default DefaultLayout;
