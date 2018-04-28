import React from 'react';
import { prettifyTimestamp } from '../../utils/functions';

const Offline = ({ timestamp }) => (
  <section className="container">
    <div className="row">
      {timestamp ? (
        <h2 className="col-12">
          Currently offline. Showing stored data.<br />Last updated:{' '}
          {prettifyTimestamp(timestamp)}.
        </h2>
      ) : (
        <h2 className="col-12">
          Currently offline. Please reconnect to get full information.
        </h2>
      )}
    </div>
  </section>
);

export default Offline;
