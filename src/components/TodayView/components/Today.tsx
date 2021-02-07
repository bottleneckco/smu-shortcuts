import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  todayDate: number;
}

const Today: React.FC<Props> = (props) => {
  const { todayDate } = props;
  const [schoolTerm, setSchoolTerm] = useState({
    title: '',
    daysIn: 0,
    isBreak: false,
    isLastDay: false,
  });

  useEffect(() => {
    /**
     *  Finds the current schedule in school
     *    E.g. Week 2, Vacation, Recess Week.
     *  Returns an object
     */
    const getSchoolTerm = async () => {
      const annualYear = await fetch(
        `${process.env.SERVER_URL}` + '/sch_terms.json'
      ).then((r: Response) => {
        return r.json();
      });

      for await (const year of annualYear) {
        for (const num in year) {
          const term = year[num];
          const termStart = new Date(
            Date.parse(term.startDate + ' GMT+0800')
          ).setHours(0, 0, 0);
          const termEnd = new Date(
            Date.parse(term.enddate + ' GMT+0800')
          ).setHours(23, 59, 59);

          // we found our term with 2 conditions
          // current date is more than term start date
          // current date is less than term end date
          if (todayDate > termStart && todayDate < termEnd) {
            for (const week of term.weeks) {
              const weekStart = new Date(
                Date.parse(week.startdate + ' GMT+0800')
              ).setHours(0, 0, 0);
              const weekEnd = new Date(
                Date.parse(week.enddate + ' GMT+0800')
              ).setHours(23, 59, 59);

              if (todayDate > weekStart && todayDate < weekEnd) {
                const title = week.name;
                const days = (todayDate - weekStart) / (1000 * 3600 * 24);
                const daysToEnd = (weekEnd - todayDate) / (1000 * 3600 * 24);
                // console.log(todayDate, weekStart);
                // console.log(daysToEnd);
                setSchoolTerm({
                  title: title,
                  daysIn: Math.ceil(days),
                  isBreak: title === 'Vacation' || title === 'Recess',
                  isLastDay: Math.ceil(daysToEnd) === 1,
                });
                break;
              }
            }
          }
        }
      }
    };

    getSchoolTerm();
  }, []);

  return !schoolTerm.isBreak ? (
    <WeekContainer>
      <h1 className="highlight">{schoolTerm.title.toUpperCase()}</h1>
    </WeekContainer>
  ) : (
    <WeekContainer>
      {!schoolTerm.isLastDay ? (
        <h1>DAY {schoolTerm.daysIn}</h1>
      ) : (
        <h1>Last Day</h1>
      )}
      <span>OF</span>
      <h1 className="highlight">{schoolTerm.title.toUpperCase()}</h1>
    </WeekContainer>
  );
};

Today.defaultProps = {
  todayDate: Date.now(),
};

const WeekContainer = styled.div`
  height: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #ffffff;
  background-color: #2b2b2b;

  .highlight {
    color: #e4a925;
  }

  h1 {
    margin: 0;
    font-size: 3rem;
    font-weight: 800;
    line-height: 96%;
  }

  span {
    font-weight: 700;
    padding: 4px 0;
    font-size: 1.5em;
  }

  @media screen and (max-width: 1100px) {
    h1 {
      font-size: 2.25rem;
    }

    span {
      font-size: 1.2em;
    }
  }

  @media screen and (max-width: 720px) {
    h1 {
      font-size: 12vw;
    }

    span {
      font-size: 8vw;
    }
  }
`;

export default Today;
