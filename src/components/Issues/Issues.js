import React from 'react';
import { Link } from 'react-router-dom';
import ImageOverlayCard from '../common/Cards/ImageOverlayCard';

const Issues = props => {
  console.log('props for Issues', props);
  const issues = props.issues;

  document.title = 'Local Majority | Issues';

  return (
    <div className="Issues flex">
      {issues.map((issue, i) => <ImageOverlayCard />)}
    </div>
  );
};

export default Issues;

//        <h3 key={i}>
//          <Link to={`/issues/${issue.slug}`}>{issue.title}</Link>
//        </h3>
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
