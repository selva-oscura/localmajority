import React from 'react';
import Card from '../common/Cards/Card';

const Issues = props => {
  console.log('props for Issues', props);
  const issues = props.issues;
  document.title = 'Local Majority | Issues';

  return (
    <div className="Issues flex">
      {issues.map((issue, i) => <h3 key={i}>{issue.title}</h3>)}
    </div>
  );
};

export default Issues;

// <Card
//   key={i}
//   id={issue.id}
//   cardTitle={issue.title}
//   cardSubtitle={`by ${issue.author}`}
//   cardText={issue.summary}
//   imgSrc="needs to be added"
//   category="issues"
//   slug="needs to be added"
//   imgShape="landscape"
// />
