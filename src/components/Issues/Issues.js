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
    <main className="Issues">
      <article className="container">
        <div className="row">
          {issues.map((issue, i) => (
            <GridXSmallIsOneMedIsTwoLargeIsThree key={i}>
              <CardHover>
                <Link to={`/reports/${issue.slug}`}>
                  <ImageOverlayCard
                    cardTitle={issue.title}
                    imgSrc="https://placekitten.com/g/200/150"
                  />
                </Link>
              </CardHover>
            </GridXSmallIsOneMedIsTwoLargeIsThree>
          ))}
        </div>
      </article>
    </main>
  );
};

export default Issues;
