import styled from 'styled-components';

export const CardTemplate = styled.div`
  box-sizing: border-box;
  padding: 16px;
  border-radius: 22px;
  background: rgba(240, 240, 240, 0.9);

  @supports (backdrop-filter: blur(2em)) {
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(2em);
  }
`;
