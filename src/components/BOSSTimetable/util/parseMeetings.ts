import moment, { Moment } from 'moment';

interface Meeting {
  classCode: string;
  classDesc: string;
  section: string;
  type: 'CLASS' | 'EXAM';
  termStart: Moment;
  termEnd: Moment;
  timeStart: string;
  timeEnd: string;
  venue: string;
  instructor: string;
  dayOfWeek: string;
}

export default function parseMeetings(data: string[][]): Meeting[] {
  return data.map((event) => {
    const classCode = event[3];
    const classDesc = event[4];

    const section = event[5];
    const type = event[7];

    const startDate = event[8]; // of the whole term, not the actual event!
    const endDate = event[9];
    const startTime = event[11];
    const endTime = event[12];

    const venue = event[13];
    const instructor = event[14];

    const dayOfWeek = event[10];
    const startDateActual = moment(startDate);
    startDateActual.day(dayOfWeek);

    return {
      classCode,
      classDesc,
      section,
      type: type as Meeting['type'],
      termStart: moment(startDate),
      termEnd: moment(endDate),
      timeStart: startTime,
      timeEnd: endTime,
      venue,
      instructor,
      dayOfWeek,
    };
  });
}
