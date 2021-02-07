import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  todayDate: number;
}

const Events: React.FC<Props> = (props) => {
  const { todayDate } = props;
  const maxUpcomingEvents = 3;
  const [date, setDate] = useState('');
  const [upcoming, setUpcoming] = useState({
    summary: '',
    startTime: 0,
    endTime: 0,
  });

  useEffect(() => {
    /**
     * Return the upcoming events as an array containing objects.
     */
    const getUpcoming = async () => {
      const ongoingEvents = [];
      const upcomingEvents = [];

      const allEvents = await fetch(
        `${process.env.SERVER_URL}` + '/important_dates.json'
      ).then((r: Response) => {
        return r.json();
      });

      for await (const event of allEvents) {
        const startDate = event.startTime;
        const endDate = event.endTime;

        // if event is ongoing or upcoming
        if (todayDate >= startDate && todayDate <= endDate) {
          ongoingEvents.push(event);
        } else if (todayDate < startDate) {
          upcomingEvents.push(event);
        }

        // break loop to avoid wasting time,
        // we only want to show a few upcoming events
        // Assumption that JSON file contents is filtered from oldest to newests
        if (upcomingEvents.length === maxUpcomingEvents) {
          break;
        }
      }
      const combinedEvents = [...ongoingEvents, ...upcomingEvents];
      combinedEvents.length > 0 && setUpcoming(combinedEvents[0]);

      const dateList = new Date(combinedEvents[0].startTime)
        .toDateString()
        .split(' ');
      setDate(`(${dateList[2]} ${dateList[1]})`);
    };

    getUpcoming();
  }, []);

  return upcoming.summary === '' ? (
    <UpcomingContainer>
      <h2>No Upcoming Event</h2>
    </UpcomingContainer>
  ) : (
    <UpcomingContainer>
      <h2>Upcoming Event {date}</h2>
      <p>{upcoming.summary}</p>
    </UpcomingContainer>
  );
};

Events.defaultProps = {
  todayDate: Date.now(),
};

const UpcomingContainer = styled.div`
  height: 35%;
  padding: 0 8px;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin: 0;
    font-size: 1.2rem;
    text-overflow: ellipsis;
  }

  p {
    margin: 4px 0;
    width: 100%;
    font-weight: 500;
    font-size: 1.2rem;
  }

  @media screen and (max-width: 1100px) {
    padding: 0 4px;
    h2 {
      font-size: 2vw;
    }
    p {
      font-size: 1.75vw;
    }
  }

  @media screen and (max-width: 720px) {
    padding: 0 16px;
    h2 {
      font-size: 5.65vw;
      margin-bottom: 0.5vw;
    }
    p {
      margin: 8px 0;
      font-size: 4vw;
    }
  }
`;

export default Events;
