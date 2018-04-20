import React from 'react';
import { Link } from 'react-router-dom';
import States from '../States/States';
import HomeAside from './HomeAside';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import CardHover from '../common/Cards/CardHover';
import FooterCard from '../common/Cards/FooterCard';
import ArticleCard from '../common/Cards/ArticleCard';
import candidatesVA2017 from '../../data/candidatesVA2017';
import './Home.css';

const Home = props => {
  document.title = 'Local Majority';

  const { articles, candidates, currentStateRaces, pastCandidates } = props;

  const facesCandidates = []
    // pastCandidates
    //   .map(candidate => {
    //     return {
    //       title: candidate['title'],
    //       district: `${candidate['state']['title']} ${candidate['contestId'][
    //         'seatId'
    //       ]['title'].slice(3)}`,
    //       won: true,
    //       electionYear: Number(
    //         candidate['contestId']['electionDate'].slice(0, 4)
    //       ),
    //       headshot: candidate['headshotId']['url'],
    //     };
    //   })
    .concat(candidatesVA2017)
    .concat(
      candidates.slice(0, 18 - candidatesVA2017.length).map(candidate => {
        return {
          title: candidate['title'],
          district: `${candidate['state']['title']} ${candidate['contestId'][
            'seatId'
          ]['title'].slice(3)}`,
          won: false,
          electionYear: Number(
            candidate['contestId']['electionDate'].slice(0, 4)
          ),
          slug: candidate['title']
            .split(' ')
            .join('-')
            .toLowerCase(),
          headshot: candidate['headshotId']['url'],
        };
      })
    );

  const presentationForCandidatesFaces = [];
  const numberOfRowsForFaces = 2;
  for (let i = 0; i < numberOfRowsForFaces; i++) {
    presentationForCandidatesFaces.push(
      facesCandidates.slice(
        i * (facesCandidates.length / numberOfRowsForFaces),
        (i + 1) * (facesCandidates.length / numberOfRowsForFaces)
      )
    );
  }

  return (
    <div className="Home">
      <div className="row">
        <section className="col-12">
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

          <div className="FacesColourBackground" style={{ padding: '24px 0' }}>
            {presentationForCandidatesFaces.map((rowContents, i) => (
              <div className="row no-gutters" key={i}>
                {rowContents.map((candidate, j) => {
                  const imgSrc = candidate.headshot
                    ? candidate.headshot
                    : `../images/candidates_of_yore/color/${
                        candidate.slug
                      }.png`;
                  return (
                    <div
                      className="col"
                      key={j}
                      style={{
                        padding: '1px',
                        background:
                          "url('images/placeholderImage.svg') no-repeat",
                        backgroundSize: '100%',
                        backgroundPosition: 'center 0',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        className="full-width"
                        src={imgSrc}
                        alt={`${candidate.title}, Local Majority backed ${
                          candidate.electionYear
                        } candidate for ${candidate.district}`}
                        title={`${candidate.title}, Local Majority backed ${
                          candidate.electionYear
                        } candidate for ${candidate.district}`}
                        style={{
                          textIndent: '100%',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </section>

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
              articles.slice(0, 8).map(article => {
                let cardTags = article && article.tags ? article.tags : [];
                let articleThumbnail = article.thumbnail
                  ? article.thumbnail
                  : '../images/economy.jpg';

                return (
                  <GridXSmallIsOneSmallIsThree key={article.slug}>
                    <ArticleCard
                      slug={article.slug}
                      imageSrc={articleThumbnail}
                      title={article.title}
                      author={article.author}
                      updatedAt={article.updatedAt}
                      tagRoute="research"
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

        <div className="col-12 col-lg-4 col-xl-3">
          <HomeAside twitterHandles={['local_majority']} />
        </div>
      </div>
    </div>
  );
};

export default Home;
