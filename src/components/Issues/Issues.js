import React from 'react';
import Card from '../common/Card';

const Issues = props => {
  console.log('props for Issues', props);
  const issues = props.issues;
  document.title = 'Local Majority | Issues';

  return (
    <div className="Issues flex">
      {issues.map((issue, i) => (
        <h3 key={i}>{issue.title}</h3>
      ))}
    </div>
  );
};

export default Issues;
