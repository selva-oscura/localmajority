import React from 'react';
import { Link } from 'react-router-dom';

const NoSuchReading = ({ readingId }) => {
  return (
    <div className="NoSuchReading">
      <h2>
        We're sorry. There has been an error and we could not retrieve this
        article. Would like to read another article?
        <Link to="/issues">Return to Issues</Link>
      </h2>
    </div>
  );
};

export default NoSuchReading;
