import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ReadingLink.css';

const ReadingLink = ({ friendlyId, title, type }) => {
  const readingTypesText = {
    TalkingPoints: 'Talking Points',
    Articles: 'Article',
    DistrictPrimers: 'District Primer',
  };
  const readingTypesRoute = {};
  const readingTypeText = readingTypesText[type];
  return (
    <Link className="ReadingLink" key={i} to={`/${type}/${friendlyId}`}>
      <h4>
        <span className="reading-type">{readingTypeText}</span>
        <span className="reading-title">{title}</span>
      </h4>
    </Link>
  );
};

export default ReadingLink;
