import { sortBy } from 'lodash';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { ModalOverlay } from '../styled';
import { ModalTemplate } from '../components';
import { Welcome_Guide_Links } from './links';

const Wrapper = styled.div`
  ul {
    margin: 0;
    padding: 24;
  }

  li {
    padding: 4px 0;
  }

  a {
    color: ${(props) => props.theme.primary};
    font-weight: 600;
  }
`;

const WelcomeGuide: React.FC = () => {
  const router = useRouter();

  const closeModal = () => {
    router.replace('/');
  };

  const sortedLinks = useMemo(() => {
    return sortBy(Welcome_Guide_Links, 'title');
  }, []);

  return (
    <>
      <ModalTemplate title="Welcome Guides">
        <Wrapper>
          <ul>
            {sortedLinks.map((link) => (
              <li key={link.id}>
                <a target="_blank" href={link.link} rel="noreferrer">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </Wrapper>
      </ModalTemplate>
      <ModalOverlay onClick={closeModal} />
    </>
  );
};

export default WelcomeGuide;
