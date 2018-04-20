import React from 'react';
import { Link } from 'react-router-dom';
import States from '../States/States';
import Slider from '../Slider/Slider';
import CandidatesFaces from '../common/CandidatesFaces';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import CardHover from '../common/Cards/CardHover';
import FooterCard from '../common/Cards/FooterCard';
import ArticleCard from '../common/Cards/ArticleCard';
import candidatesVA2017 from '../../data/candidatesVA2017';
import './Home.css';

const Home = props => {
  document.title = 'Local Majority';

  const { articles, candidates, currentStateRaces, pastCandidates } = props;

  return (
    <div className="Home">
      <Slider />
      <div className="row">
        <section className="col-12">
          <h2 className="text-center">
            State Legislatures are <span className="tertiary-text-color">Key</span>
          </h2>
          <p className="text-center">
            State legislatures not only create the laws that affect the everyday lives of their constituents, they also play a critical role in determining the districts for the U.S. House of Representatives and thus the fate of the entire country. Local Majority provides research that is practical and accessible to support progressive campaigns for state legislature. Join us or support our efforts!
          </p>
        </section>

        <CandidatesFaces
          candidatesVA2017={candidatesVA2017}
          candidates={candidates}
        />
        
        <States currentStateRaces={currentStateRaces} />

        <section className="col-12">
          <h2 className="text-center">Featured Candidates</h2>
          <div className="row">
            {candidates && candidates.length ? (
              candidates.map((candidate, i) => {
                const headshotUrl =
                  candidate.headshotId && candidate.headshotId.url
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
                  <GridXSmallIsOneSmallIsThree key={i}>
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
                  </GridXSmallIsOneSmallIsThree>
                );
              })
            ) : (
              <h2>Loading</h2>
            )}
          </div>
        </section>

        <section className="col-12">
          <h2 className="text-center">Featured Articles</h2>
          <div className="row">
            {articles && articles.length ? (
              articles.slice(0, 6).map(article => {
                let cardTags = article && article.tags ? article.tags : [];
                let articleThumbnail = article.thumbnail
                  ? article.thumbnail
                  : 'https://placekitten.com/200/150';

                return (
                  <GridXSmallIsOneSmallIsThree key={article.slug}>
                    <ArticleCard
                      slug={article.slug}
                      imageSrc={articleThumbnail}
                      title={article.title}
                      author={article.author}
                      updatedAt={article.updatedAt}
                      tagRoute="reports"
                      tags={cardTags}
                    />
                  </GridXSmallIsOneSmallIsThree>
                );
              })
            ) : (
              <h2>Loading</h2>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
