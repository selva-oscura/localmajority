import React from 'react';
import { Link } from 'react-router-dom';
import States from '../States/States';
import Slider from '../Slider/Slider';
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
      <Slider />
      <div className="row">
        <section className="col-12">
          <h2 className="text-center">
            State Legislatures are <span className="tertiary-text-color">Key</span>
          </h2>
          <p className="text-center">
            State legislatures not only create the laws that affect the everyday lives of their constituents, they also play a critical role in determining the districts for the U.S. House of Representatives and thus the fate of the entire country. Local Majority provides research that is practical and accessible to support progressive campaigns for state legislature. Join us or support our efforts!
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
