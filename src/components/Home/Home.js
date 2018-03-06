import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Aside from '../common/Aside';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import GridXSmallIsOneSmIsTwoMedIsThreeLargeIsFour from '../common/Grids/GridXSmallIsOneSmIsTwoMedIsThreeLargeIsFour';
import CardHover from '../common/Cards/CardHover';
import FooterCard from '../common/Cards/FooterCard';
import { prettifyDate } from '../../utils/functions';

const Home = props => {
  document.title = 'Local Majority';
  // console.log('from Home', props);
  let { articles, candidates } = props;
  const currentStateRaces = [
    {
      title: 'Florida',
      abbrev: 'FL',
      districts: [
        'House District 11',
        'House District 20',
        'House District 24',
      ],
    },
    {
      title: 'Michigan',
      abbrev: 'MI',
      districts: [
        'Assembly District 1',
        'Assembly District 2',
        'Assembly District 3',
      ],
    },
    {
      title: 'Minnesota',
      abbrev: 'MN',
      districts: ['Assembly 1', 'Assembly 12', 'Assembly District 33'],
    },
  ];
  const arrayToSentence = arr => {
    if (arr.length === 1) {
      return arr[0];
    } else if (arr.length === 2) {
      return arr.join(' and ');
    } else if (arr.length > 2) {
      arr[arr.length - 1] = `and ${arr[arr.length - 1]}`;
      return arr.join(', ');
    } else {
      return null;
    }
  };
  // let { articles, candidates } = props;
  // let issuePrimers = articles.filter(a => a.type === 'IssuePrimer');
  return (
    <div className="Home">
      <div className="main-and-aside">
        <article className="Main">
          <section>
            <img
              className="splash-image"
              src="../images/faces.png"
              alt="faces of candidates"
            />
            <h2 className="text-center">
              Working Locally to Take Back State Legislatures
            </h2>
            <p className="text-center">
              Local Majority provides research and other support for small state
              legislative campaigns who may not have many resources. Our goal is
              to build from the grassroots the local support that will help
              Democrats take back state legislatures across the country,
              beginning with Virginia in 2017, and continuing with Florida,
              Michigan and Minnesota in 2018.
            </p>
          </section>

          <section>
            <h2 className="text-center">Our States</h2>
            <div className="flex">
              {currentStateRaces.map((state, i) => (
                <GridXSmallIsOneSmallIsThree
                  key={i}
                >
                  <CardHover>
                    <Link to={`districts/${state.title}`}>
                      <FooterCard
                        cardTitle={state.title}
                        imgSrc={`../images/${state.title}.jpg`}
                        insetImg="insetImg"
                      />
                    </Link>
                  </CardHover>
                </GridXSmallIsOneSmallIsThree>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-center">Featured Candidates</h2>
            <div className="flex">
              {candidates && candidates.length ? (
                candidates.map((candidate, i) => (
                  <GridXSmallIsOneSmIsTwoMedIsThreeLargeIsFour
                    key={i}
                  >
                    <CardHover>
                      <Link to={`candidates/${candidate.state.title}/${candidate.slug}`}>
                        <FooterCard
                          cardTitle={candidate.title}
                          cardSubtitle={candidate.contestId.seatId.title}
                          imgSrc={candidate.headshotId.url}
                        />
                      </Link>
                    </CardHover>

                  </GridXSmallIsOneSmIsTwoMedIsThreeLargeIsFour>
                ))
              ) : (
                <h2>Loading</h2>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-center">Featured Articles</h2>
            <div className="flex">
              {articles && articles.length ? (
                articles
                  .slice(0, 8)
                  .map(article => (
                    <GridXSmallIsOneSmIsTwoMedIsThreeLargeIsFour
                      key={article.id}
                    >
                      <CardHover>
                        <Link to={`articles/${article.slug}`}>
                          <FooterCard
                            cardTitle={article.title}
                            cardSubtitle={`by ${article.author}`}
                            cardText={prettifyDate(article.updatedAt)}
                            imgSrc={null}
                          />
                        </Link>
                      </CardHover>
                    </GridXSmallIsOneSmIsTwoMedIsThreeLargeIsFour>
                  ))
              ) : (
                <h2>Loading</h2>
              )}
            </div>
          </section>
        </article>
        <Aside twitterHandles={['local_majority']} />
      </div>
    </div>
  );
};

export default Home;

// <h3>Featured Articles</h3>
// <div className="flex">
//   {issuePrimers.length ? (
//     issuePrimers.map((issuePrimer, i) => (
//       <Card
//         key={`issuePrimer-${i}`}
//         id={issuePrimer.id}
//         cardTitle={issuePrimer.title}
//         cardSubtitle={issuePrimer.author}
//         cardText={issuePrimer.description}
//         imgSrc="ImageSourceNeeded"
//         category="article"
//         slug={issuePrimer.slug}
//         imgShape="landscape"
//       />
//     ))
//   ) : (
//     <h2>Loading</h2>
//   )}
// </div>
