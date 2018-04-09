import React from 'react';
import { Link } from 'react-router-dom';

const NoSuchArticle = ({ candidateId }) => {
  return (
    <div className="NoSuchArticle">
      <h2>Error fetching Article</h2>
      <Link to="/research">Return to List of Issues</Link>
    </div>
  );
};

export default NoSuchArticle;
