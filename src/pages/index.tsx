import React from 'react';
import styled from 'styled-components';
import CardLink from '../components/CardLink';
import Ticker from '../components/Ticker';
import TodayView from '../components/TodayView';

import DefaultLayout from '../layouts/DefaultLayout';

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 8px;
  grid-template-areas:
    'b1 b1 s1 s2 s5 s6'
    'b1 b1 s3 s4 s7 s8'
    'c1 c2 c3 c4 c5 c6';

  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'b1 b1'
      'b1 b1'
      's1 s2'
      's3 s4'
      's5 s6'
      's7 s8'
      'c1 c2'
      'c3 c4'
      'c5 c6';
  }
`;

export const Home: React.FC = () => {
  return (
    <DefaultLayout>
      <Ticker />

      <Container>
        <TodayView gridArea="b1" />

        <CardLink
          gridArea="s1"
          title="eLearn"
          logo="menu_book"
          link="https://elearn.smu.edu.sg"
        />
        <CardLink
          gridArea="s2"
          title="Oasis"
          logo="beach_access"
          link="https://oasis.smu.edu.sg"
        />
        <CardLink
          gridArea="s3"
          title="Facility Bookings"
          logo="airline_seat_individual_suite"
          link="https://fbs.intranet.smu.edu.sg"
        />
        <CardLink
          gridArea="s4"
          title="Print Services"
          logo="print"
          link="https://smu.sg/print"
        />

        <CardLink
          gridArea="s5"
          title="Library"
          logo="book"
          link="https://library.smu.edu.sg/"
        />
        <CardLink
          gridArea="s6"
          title="Academic Calendar"
          logo="event"
          link="/calendar"
          newTab={false}
        />
        <CardLink
          gridArea="s7"
          title="Guides"
          logo="forum"
          link="/guides"
          newTab={false}
        />
        <CardLink
          gridArea="s8"
          title="Community"
          logo="groups"
          link="/community"
          newTab={false}
        />

        <CardLink
          gridArea="c1"
          title="Student Wellness"
          logo="favorite"
          link="https://www.smu.edu.sg/campus-life/student-wellness"
        />
        <CardLink
          gridArea="c2"
          title="Voices@ SMU"
          logo="hearing"
          link="https://voices.smu.edu.sg/get-support#speak-to-us"
        />
        <CardLink
          gridArea="c3"
          title="Boss"
          logo="account_balance_wallet"
          link="https://boss.intranet.smu.edu.sg"
        />
        <CardLink
          gridArea="c4"
          title="onTRAC II"
          logo="work"
          link="https://ontrac.smu.edu.sg"
        />
        <CardLink
          gridArea="c5"
          title="SPS"
          logo="biotech"
          link="https://sps.intranet.smu.edu.sg"
        />
        <CardLink
          gridArea="c6"
          title="Course Offerings"
          logo="payments"
          link="https://inet.smu.edu.sg/sites/courses/Pages/Course-Offerings.aspx"
        />
      </Container>
    </DefaultLayout>
  );
};

export default Home;
