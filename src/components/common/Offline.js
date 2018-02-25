import React from 'react';
import { prettifyTimestamp } from '../../utils/functions';

const Offline = ({ timestamp }) => {
  return timestamp ? (
    <p className="error">
      Currently offline. Showing stored data.<br />Last updated:{' '}
      {prettifyTimestamp(timestamp)}.
    </p>
  ) : (
    <p className="error">
      Currently offline. Please reconnect to get full information.
    </p>
  );
};

export default Offline;
