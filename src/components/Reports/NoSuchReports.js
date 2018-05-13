import React from 'react';
import { Link } from 'react-router-dom';
// import './District.css';

const NoSuchReports = ({ issueParam }) => {
  return (
    <div className="NoSuchReports">
      <h2>We're sorry. No articles match the term '{issueParam}'.</h2>
      <Link to="/reports">Return to List of Issues</Link>
    </div>
  );
};

export default NoSuchReports;
