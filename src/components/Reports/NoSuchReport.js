import React from 'react';
import { Link } from 'react-router-dom';

const NoSuchReport = ({ candidateId }) => {
  return (
    <div className="NoSuchReport">
      <h2>Error fetching Report</h2>
      <Link to="/reports">Return to List of Issues</Link>
    </div>
  );
};

export default NoSuchReport;
