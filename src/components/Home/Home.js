import React from 'react';
import { Link } from 'react-router-dom';
import States from '../States/States';
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
    },
    {
      title: 'Michigan',
      abbrev: 'MI',
    },
    {
      title: 'Minnesota',
      abbrev: 'MN',
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

        <States currentStateRaces={currentStateRaces} />

        <section className="col-12">
          <h2 className="text-center">Featured Candidates</h2>
          <div className="flex">
            {candidates && candidates.length ? (
              candidates.map((candidate, i) => {
                const headshotUrl = candidate.headshotId && candidate.headshotId.url
                  ? candidate.headshotId.url
                  : null;
                const seatTitle =
                  candidate &&
                  candidate.contestId &&
                  candidate.contestId.seatId &&
                  candidate.contestId.seatId.title
                    ? candidate.contestId.seatId.title
                    : null;

                return (
                  <GridXSmallIsOneSmIsTwoMedIsThreeLargeIsFour key={i}>
                    <CardHover>
                      <Link
                        to={`candidates/${candidate.state.title}/${
                          candidate.slug
                        }`}
                      >
                        <FooterCard
                          cardTitle={candidate.title}
                          cardSubtitle={seatTitle}
                          imgSrc={headshotUrl}
                        />
                      </Link>
                    </CardHover>
                  </GridXSmallIsOneSmIsTwoMedIsThreeLargeIsFour>
                )
              })
            ) : (
              <h2>Loading</h2>
            )}
          </div>
        </section>

        <section className="col-12 col-lg-8 col-xl-9">
          <h2 className="text-center">Featured Articles</h2>
          {articles && articles.length ? (
            articles.slice(0, 8).map(article => (
              <Link key={article.id} to={`/articles/${article.slug}`}>
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
