import React from 'react';
import { Link } from 'react-router-dom';
// import './District.css';

const NoSuchIssue = ({ issueParam }) => {
  return (
    <div className="NoSuchIssue">
      <h2>We're sorry. {issueParam} not found</h2>
      <Link to="/research">Return to List of Issues</Link>
    </div>
  );
};

export default NoSuchIssue;
