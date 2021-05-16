import React from 'react';
import styled from 'styled-components';

import DefaultLayout from '../layouts/DefaultLayout';

const Container = styled.div`
  width: 100%;
  padding: 12px;
  margin: 12px 0;
  border: 3px solid #2b2b2b;
  box-sizing: border-box;

  h3 {
    margin: 0;
  }

  p,
  li {
    font-weight: 500;
  }

  li {
    padding: 6px 0;
  }

  a {
    color: #2b2b2b;
  }

  a:hover {
    color: #946c14;
  }
`;

export const About: React.FC = () => {
  return (
    <DefaultLayout title="About">
      <Container>
        <p>
          Providing students a quick one-click bookmarks to commonly used sites
          in SMU.
        </p>
        <p>Designed by SMU students for SMU students </p>
        <p>This site is non-affliated with SMU.</p>
      </Container>
      <Container>
        <h3>Contribute</h3>
        <p>Want to add more sites or offer suggestions?</p>
        <ul>
          <li>
            SMU Student? Make a suggestion&nbsp;
            <a href="https://bit.ly/30SRyIo">here</a>
          </li>
          <li>
            Developer? Add an issue or make a pull request on&nbsp;
            <a href="https://github.com/fourthclasshonours/smu-shortcuts">
              Github
            </a>
          </li>
        </ul>
      </Container>
    </DefaultLayout>
  );
};

export default About;
