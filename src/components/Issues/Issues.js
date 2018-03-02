import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Cards/Card';

const Issues = props => {
  console.log('props for Issues', props);
  const issues = props.issues;

  document.title = 'Local Majority | Issues';

  return (
    <div className="Issues flex">
      {issues.map((issue, i) => (
        <h3 key={i}>
          <Link to={`/issues/${issue.slug}`}>{issue.title}</Link>
        </h3>
      ))}
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

<Link to="/candidates">Return to List of Candidates</Link>;
