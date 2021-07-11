import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { ModalTemplate } from '../components';
import { ModalOverlay } from '../styled';

const Wrapper = styled.div`
  h3,
  p,
  li,
  ul {
    color: ${(props) => props.theme.text600};
  }
  h3 {
    margin: 0;
    margin-top: 16px;
  }

  p {
    font-weight: 500;
    margin: 4px 0;
  }

  li {
    font-weight: 500;
    padding: 4px 0;
  }

  ul {
    margin: 2px 0;
  }

  a {
    color: ${(props) => props.theme.primary.blue};
  }
`;

const About: React.FC = () => {
  const router = useRouter();
  const closeModal = () => {
    router.replace('/');
  };

  return (
    <>
      <ModalTemplate title="About SMU Shortcuts">
        <Wrapper>
          <p>
            Providing students a quick one-click bookmarks to commonly used
            sites in SMU.
          </p>
          <p>Designed by SMU students for SMU students </p>
          <p>This site is non-affliated with SMU.</p>

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
        </Wrapper>
      </ModalTemplate>
      <ModalOverlay onClick={closeModal} />
    </>
  );
};

export default About;
