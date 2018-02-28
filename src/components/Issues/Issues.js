import React from 'react';
import Card from '../common/Cards/Card';

const Issues = props => {

  const issues = [];
	for(let i = 1; i<10; i++){
		let subIssues = []
		for(let j = 1; i<5; j++){
			subIssues.push({id: `${i}_${j}`, title: `Sock Puppet ${i} - ${j}`, slug: `sock-puppet-${i}-${j}`});
		}
		issues.push({id: i, title: `Sock Puppet ${i}`, slug: `sock-puppet-${i}`, subIssues: subIssues});
	}
	// console.log('props for Issues', props);
	// const issues = props.issues;

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
