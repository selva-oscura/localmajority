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
    <Link className="ReadingLink" key={slug} to={`/articles/${slug}`}>
      <div style={{ width: '100px' }} />
      <div style={{ width: 'calc(100% - 100px)' }}>
        <span className="reading-type">{readingTypeText}</span>
        <span className="reading-title">{title}</span>
      </div>
    </Link>
  );
};

export default ReadingLink;
