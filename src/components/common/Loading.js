import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Section from '../common/Section/Section';

const Loading = () => (
  <Section hasContainer={true} spacingAbove={3} spacingBelow={3} background="">
    <h2>
      Loading....
      <CircularProgress />
    </h2>
  </Section>
);

export default Loading;
