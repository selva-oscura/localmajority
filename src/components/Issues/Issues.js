import React from 'react';
import { Link } from 'react-router-dom';
import GridXSmallIsOneMedIsTwoLargeIsThree from '../common/Grids/GridXSmallIsOneMedIsTwoLargeIsThree';
import CardHover from '../common/Cards/CardHover';
import ImageOverlayCard from '../common/Cards/ImageOverlayCard';

const Issues = props => {
  console.log('props for Issues', props);
  const issues = props.issues;

  document.title = 'Local Majority | Issues';

  return (
    <div className="Issues row">
      {issues.map((issue, i) => (
        <GridXSmallIsOneMedIsTwoLargeIsThree key={i}>
          <CardHover>
            <Link to={`/research/${issue.slug}`}>
              <ImageOverlayCard
                cardTitle={issue.title}
                imgSrc={`../images/District_1_map.png`}
              />
            </Link>
          </CardHover>
        </GridXSmallIsOneMedIsTwoLargeIsThree>
      ))}
    </div>
  );
};

export default Issues;
