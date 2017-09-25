import React from 'react';
import Card from '../common/Card';

const Issues = (props) => {
  console.log('props for Issues', props);
  const issues = props.issues;
  document.title = "Local Majority | Issues";

  return (
    <div className="Issues flex">
    	{issues.map((issue, i) => (
    		<Card
    			key={i}
    			title={issue.title}
    			subtitle={`by ${issue.author}`}
    			text={issue.summary}
    			imgSrc={issue.imgSrc}
    			category="issues"
    			id={issue.id}
    			imgShape="landscape"
    		/>
    	))}
    </div>
  );
};

export default Issues;
