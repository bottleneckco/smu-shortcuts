import { Moment } from 'moment';

import tzSingapore from './tzSingapore';

export interface Event {
  summary: string;
  description: string;
  location: string;
  dtStart: Moment;
  dtEnd: Moment;
  tzid: string;
  repeatFreq?: 'weekly' | 'daily' | 'monthly';
  repeatEnd?: Moment;
  alarms: string[];
}

function escapeNewlines(str: string) {
  return str.replace(/\n/g, '\\n');
}

function generateEvent(event: Event) {
  const {
    summary,
    description,
    location,
    dtStart,
    dtEnd,
    repeatFreq,
    repeatEnd,
    alarms,
    tzid,
  } = event;

  let temp = `SUMMARY:${escapeNewlines(summary)}
DESCRIPTION:${escapeNewlines(description)}
LOCATION:${escapeNewlines(location)}
DTSTART;TZID=${tzid}:${dtStart.format('yyyyMMDDTHHmmss')}
DTEND;TZID=${tzid}:${dtEnd.format('yyyyMMDDTHHmmss')}`;

  if (repeatFreq && repeatEnd) {
    temp += '\n';
    temp += `RRULE:FREQ=${repeatFreq.toUpperCase()};UNTIL=${repeatEnd.format(
      'yyyyMMDDTHHmmss'
    )}`;
  }

  for (const alarm of alarms) {
    temp += '\n';
    temp += `BEGIN:VALARM
TRIGGER:${alarm}
ACTION:DISPLAY
DESCRIPTION:Alert before event
END:VALARM`;
  }

  return `BEGIN:VEVENT\n${temp}\nEND:VEVENT`;
}

export default function generateICal(
  events: Event[],
  timezone = tzSingapore
): string {
  return `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:-//calendarserver.org//Zonal//EN
${timezone}
${events.map(generateEvent).join('\n')}
END:VCALENDAR`;
}
