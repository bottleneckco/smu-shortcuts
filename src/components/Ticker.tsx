import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TickerWrapper = styled.div`
  padding: 12px 8px;
  border: 3px solid #2b2b2b;
  margin-bottom: 16px;
`;

const TickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  animation: fadeInOut 5s ease-out 0s 1;
  -webkit-animation: fadeInOut 5s ease-out 0s 1;

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const TickerHeader = styled.span`
  font-weight: 700;
  padding-right: 12px;
  color: rgba(0, 0, 0, 0.56);
`;

const TickerMessage = styled.span`
  font-weight: 500;
`;

const Ticker: React.FC = () => {
  const [ticker, setTicker] = useState([
    {
      title: 'News',
      content: 'Welcome to SMU Shortcuts!',
    },
  ]);
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      const tickerList: { title: string; content: string }[] = ticker;
      await fetch(
        `https://smulibraries.southeastasia.cloudapp.azure.com/public/count.json`
      )
        .then((r: Response) => r.json())
        .then((data: any) => {
          tickerList.push({
            title: 'Occupancy Level',
            content: `Li Ka Shing Library: ${data.lks.inside} / 1150`,
          });

          tickerList.push({
            title: 'Occupancy Level',
            content: `Kwa Geok Choo Law Library: ${data.kgc.inside} / 300`,
          });
        });

      setTicker(tickerList);
    };
    load();
  }, []);

  const Message = () => {
    const [message, setMessage] = useState(ticker[tickerIndex]);
    const repeatTime = 5000;

    useEffect(() => {
      const timer = setInterval(() => {
        setMessage(ticker[tickerIndex]);
        // reset index to 0 if we overshot the array count
        setTickerIndex((tickerIndex) =>
          tickerIndex + 1 >= ticker.length ? 0 : tickerIndex + 1
        );
      }, repeatTime);

      return () => clearInterval(timer);
    }, []);

    return ticker.length > 0 ? (
      <TickerContainer>
        <TickerHeader>{message.title}</TickerHeader>
        <TickerMessage>{message.content}</TickerMessage>
      </TickerContainer>
    ) : (
      <TickerContainer>
        <TickerMessage>No announcements</TickerMessage>
      </TickerContainer>
    );
  };

  return (
    <TickerWrapper>
      <Message />
    </TickerWrapper>
  );
};

export default Ticker;
