import React from 'react';
import Article from './Article';
import TalkingPoints from './TalkingPoints';
import DistrictPrimer from './DistrictPrimer';
import IssuePrimer from './IssuePrimer';
import NoSuchReading from './NoSuchReading';

const ReadingHolder = props => {
  const { reading } = props;
  console.log('props for ReadingHolder', reading, reading.type === 'Article');
  if (reading && reading.title) {
    document.title = `Local Majority | ${reading.title}`;
  } else {
    document.title = 'Local Majority | Unrecognized Reading';
  }
  return (
    <div className="ReadingHolder">
      {reading && reading.type === 'Article' && <Article reading={reading} />}
      {reading &&
        reading.type === 'TalkingPoints' && <TalkingPoints reading={reading} />}
      {reading &&
        reading.type === 'DistrictPrimer' &&
          <DistrictPrimer reading={reading} />
      }
      {reading &&
        reading.type === 'IssuePrimer' &&
          <IssuePrimer reading={reading} />
      }

      {!reading && <NoSuchReading readingId={props.match.params.id} />}
    </div>
  );
};

export default ReadingHolder;
