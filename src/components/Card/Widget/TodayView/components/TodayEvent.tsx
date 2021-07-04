import React from 'react';
import styled from 'styled-components';
import { useDataContext } from '../../../../../contexts/DataContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
  color: ${(props) => props.theme.textColor};

  h1 {
    margin: 0;
    font-size: 2.6rem;
    font-weight: 00;
    line-height: 96%;
  }

  span {
    font-weight: 600;
    padding: 0 8px;
    font-size: 1.5em;
  }

  .highlight {
    color: ${(props) => props.theme.highlight};
  }
`;

const DaysWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-bottom: 8px;
`;

const TodayEvent: React.FC = () => {
  const { currentEvent } = useDataContext();
  if (!currentEvent) {
    return null;
  }

  return !currentEvent.isBreak ? (
    <Wrapper>
      <h1 className="highlight">{currentEvent.title.toUpperCase()}</h1>
    </Wrapper>
  ) : (
    <Wrapper>
      <DaysWrapper>
        {!currentEvent.isLastDay ? (
          <h1>DAY {currentEvent.days}</h1>
        ) : (
          <h1>Last Day</h1>
        )}
        <span>OF</span>
      </DaysWrapper>
      <h1 className="highlight">{currentEvent.title.toUpperCase()}</h1>
    </Wrapper>
  );
};

export default TodayEvent;
