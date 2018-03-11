import React from 'react';
import { Link } from 'react-router-dom';
import HomeAside from './HomeAside';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import GridXSmallIsOneSmIsTwoMedIsThreeLargeIsFour from '../common/Grids/GridXSmallIsOneSmIsTwoMedIsThreeLargeIsFour';
import CardHover from '../common/Cards/CardHover';
import FooterCard from '../common/Cards/FooterCard';
import { prettifyDate } from '../../utils/functions';
import './Home.css';

const Home = props => {
  document.title = 'Local Majority';

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

  return (
    <div className="Home">
      <div className="row">
        <section className="col-12">
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
            Democrats take back state legislatures across the country, beginning
            with Virginia in 2017, and continuing with Florida, Michigan and
            Minnesota in 2018.
          </p>
        </section>
        <section className="col-12">
          <h2 className="text-center">Our States</h2>
          <div className="flex">
            {currentStateRaces.map((state, i) => (
              <GridXSmallIsOneSmallIsThree key={i}>
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
        <section className="col-12">
          <h2 className="text-center">Featured Candidates</h2>
          <div className="flex">
            {candidates && candidates.length ? (
              candidates.map((candidate, i) => (
                <GridXSmallIsOneSmIsTwoMedIsThreeLargeIsFour key={i}>
                  <CardHover>
                    <Link
                      to={`candidates/${candidate.state.title}/${
                        candidate.slug
                      }`}
                    >
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

        <section className="col-12 col-lg-8 col-xl-9">
          <h2 className="text-center">Featured Articles</h2>
          {articles && articles.length ? (
            articles.slice(0, 8).map(article => (
              <Link to={`/articles/${article.slug}`}>
                <p className="row">
                  <span className="col-sm-4">{article.articleType}</span>
                  <span className="col-sm-8">
                    {article.title}
                    by {article.author}
                    <br />
                    {prettifyDate(article.updatedAt)}
                  </span>
                </p>
              </Link>
            ))
          ) : (
            <h2>Loading</h2>
          )}
        </section>

        <div className="col-12 col-lg-4 col-xl-3">
          <HomeAside twitterHandles={['local_majority']} />
        </div>
      </div>
    </div>
  );
};

export default Home;
