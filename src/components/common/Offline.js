import React from 'react';
import Section from '../common/Section/Section';
import { prettifyTimestamp } from '../../utils/functions';

const Offline = ({ timestamp }) => (
  <Section
    hasContainer={true}
    spacingAbove={3}
    spacingBelow={3}
    background=""
  >
    {timestamp ? (
      <h2>
        Currently offline. Showing stored data.<br />Last updated:{' '}
        {prettifyTimestamp(timestamp)}.
      </h2>
    ) : (
      <h2>
        Currently offline. Please reconnect to get full information.
      </h2>
    )}
  </Section>
);

export default Offline;
