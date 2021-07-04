import React from 'react';
import styled from 'styled-components';

import { LibraryOccupancyProps } from '../../../../../Schema';

const Wrapper = styled.div`
  margin-top: 8px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h2,
  span {
    margin: 0;
    font-size: 0.9em;
    font-weight: 700;
  }

  span {
    color: ${(props) => props.theme.subtitleColor};
  }
`;

const ProgressBar = styled.div<{ percentage: number }>`
  margin-top: 8px;
  width: 100%;
  height: 8px;
  background-color: ${(props) => props.theme.primary}42;
  border-radius: 4px;

  .filled {
    border-radius: 4px;
    height: 100%;
    width: ${(props) => props.percentage}%;
    background-color: ${(props) => props.theme.primary};
  }
`;

interface Props {
  library: LibraryOccupancyProps;
}

const CapacityRow: React.FC<Props> = (props) => {
  const { library } = props;
  const percentage = Math.round(
    (library.occupancy / library.maxOccupancy) * 100,
    0
  );
  console.log(percentage);

  return (
    <Wrapper>
      <Title>
        <h2>{library.title}</h2>
        <span>
          {library.occupancy}/{library.maxOccupancy}
        </span>
      </Title>
      <ProgressBar percentage={percentage}>
        <div className="filled" />
      </ProgressBar>
    </Wrapper>
  );
};

export default CapacityRow;
