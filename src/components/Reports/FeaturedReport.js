import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithBackgroundPlaceholderImage from '../common/ImageWithBackgroundPlaceholderImage';
import Tags from '../common/Tags/Tags';
import { prettifyDate } from '../../utils/functions';
import './FeaturedReport.css';

const FeaturedReport = ({ article }) => {
  const {
    slug,
    imageSrc,
    imageAlt = '',
    title,
    author,
    updatedAt,
    tagRoute = '',
    tags = [],
  } = article;
  return (
    <div className="FeaturedReport row">
      <div className="col-12" style={{ margin: '1vw 0px 2vw 0px' }}>
        <div className="FeaturedReportShadow">
          <Link to={`/report/${slug}`}>
            <ImageWithBackgroundPlaceholderImage
              imageSrc={imageSrc}
              imageAlt=""
              aspectRatioInPercent="25"
            />
            <div className="contents row">
              <h3 className="title col-12">{title}</h3>
              <p className="details col-12 col-sm-6">{author}</p>
              <p className="details col-12 col-sm-6 text-right">
                updated {prettifyDate(updatedAt)}
              </p>
            </div>
          </Link>
          {tags && tags.length ? <Tags tags={tags} tagRoute={tagRoute} /> : null}
        </div>
      </div>
    </div>
  );
};

export default FeaturedReport;
