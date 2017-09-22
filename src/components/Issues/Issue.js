import React from 'react';
import PropTypes from 'prop-types';

const Issue = (props) => {
	console.log('props from Issue', props);
  const issue = props.issue;
  return (
    <div className="Issue">
    	<h2>{issue.title}</h2>
    	<h3>by {issue.author}</h3>
      <h6>{issue.time.slice(0, issue.time.length - 15)} -- {Math.floor(issue.contentLength / 400)} minute read</h6>
      <p>Summary: {issue.summary}</p>
    </div>
  );
};

Issue.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default Issue;
