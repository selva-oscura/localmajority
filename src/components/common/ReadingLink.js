import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ReadingLink.css';

const ReadingLink = ({ slug, title, type }) => {
  const readingTypesText = {
    TalkingPoints: 'Talking Points',
    Articles: 'Article',
    IssuePrimers: 'Issue Primer',
    DistrictPrimers: 'District Primer',
  };
  const readingTypesRoute = {};
  const readingTypeText = readingTypesText[type];
  return (
    <Link className="ReadingLink" key={i} to={`/${type}/${slug}`}>
      <h4>
        <span className="reading-type">{readingTypeText}</span>
        <span className="reading-title">{title}</span>
      </h4>
    </Link>
  );
};

export default ReadingLink;
