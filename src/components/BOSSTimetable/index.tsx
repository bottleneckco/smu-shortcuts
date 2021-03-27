import React, { useEffect, useMemo, useState } from 'react';
import { capitalize, uniqBy } from 'lodash';
import moment from 'moment';

import { useCallback } from 'react';

import parse from 'csv-parse/lib/sync';
import generateICal, { Event } from './util/generateICal';
import parseMeetings from './util/parseMeetings';

function convert(data: string[][], allowedModules: string[] = []) {
  // Remove CSV header
  const relevantData = data.slice(1);

  const meetings = parseMeetings(relevantData);

  const events: Event[] = meetings
    .filter((meeting) => {
      const { classCode } = meeting;

      return (
        allowedModules.length === 0 || allowedModules.indexOf(classCode) !== -1
      );
    })
    .map((meeting) => {
      const {
        classCode,
        classDesc,
        section,
        type,
        termStart,
        termEnd,
        timeStart,
        timeEnd,
        venue,
        instructor,
        dayOfWeek,
      } = meeting;

      // Get the first occurrence of this event
      const firstDate = termStart.clone();
      firstDate.day(dayOfWeek);

      const dtStart = moment(`${firstDate.format('DD-MMM-yyyy')} ${timeStart}`);
      const dtEnd = moment(`${firstDate.format('DD-MMM-yyyy')} ${timeEnd}`);
      const repeatEnd = moment(`${termEnd.format('DD-MMM-yyyy')} ${timeEnd}`);

      return {
        summary: `${classCode} (${classDesc}) ${capitalize(type)}`,
        description: `Section: ${section}\\nInstructor: ${instructor}`,
        location: venue,
        dtStart,
        dtEnd,
        repeatFreq: 'weekly',
        repeatEnd,
        tzid: 'Asia/Singapore',
        alarms: ['-PT10M', '-PT1H'],
      };
    });

  return generateICal(events);
}

const BOSSTimetable: React.FC = function () {
  const [fileContents, setFileContents] = useState<string | null>(null);
  const [allowedModules, setAllowedModules] = useState<string[]>([]);

  // Raw CSV contents
  const csvContents = useMemo<string[][] | null>(() => {
    if (fileContents === null) {
      return null;
    }

    return parse(fileContents);
  }, [fileContents]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      if (files === null || files.length === 0) {
        return;
      }

      const file = files[0];

      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = () => {
        const { result } = reader;
        if (typeof result === 'string') {
          setFileContents(result);
        }
      };
      reader.onerror = console.error;
    },
    []
  );

  // Generated ICS data, if available
  const generatedData = useMemo(() => {
    if (csvContents === null) {
      return null;
    }
    return convert(csvContents, allowedModules);
  }, [csvContents, allowedModules]);

  const iCalBlob = useMemo(() => {
    if (generatedData === null) {
      return null;
    }

    return new Blob([generatedData], {
      type: 'text/calendar',
    });
  }, [csvContents, allowedModules]);

  const handleAllowedModuleToggled = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = e.target;

      console.log(checked);

      if (checked) {
        setAllowedModules((modules) => [...modules, value]);
      } else {
        setAllowedModules((modules) => modules.filter((mod) => mod !== value));
      }
    },
    []
  );

  useEffect(() => {
    if (csvContents === null || allowedModules.length > 0) {
      return;
    }

    setAllowedModules(
      uniqBy(csvContents.slice(1), (event) => event[3]).map((event) => event[3])
    );
  }, [csvContents, allowedModules]);

  return (
    <div>
      <input
        type="file"
        placeholder="Upload CSV here"
        onChange={handleFileChange}
      />

      <fieldset>
        <legend>Modules to export</legend>
        {csvContents !== null &&
          uniqBy(csvContents.slice(1), (event) => event[3]).map((event) => (
            <label key={event[3]}>
              <input
                type="checkbox"
                value={event[3]}
                checked={allowedModules.indexOf(event[3]) !== -1}
                onChange={handleAllowedModuleToggled}
              />
              {event[4]}
            </label>
          ))}
      </fieldset>
      {iCalBlob !== null && (
        <a href={window.URL.createObjectURL(iCalBlob)}>Download iCal</a>
      )}
    </div>
  );
};

export default BOSSTimetable;
