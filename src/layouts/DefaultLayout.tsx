import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
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

  return (
    <Wrapper>
      <SEO title={title} />
      <NavBar />

      <main>
        <Header title={title} />
        {children}
      </main>
    </Wrapper>
  );
};

export default DefaultLayout;
