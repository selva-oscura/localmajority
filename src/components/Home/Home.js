import React from 'react';
import { Link } from 'react-router-dom';
import States from '../States/States';
import Slider from '../common/Sliders/Slider';
import Parallax from '../common/Parallax/Parallax';
import CandidatesFaces from '../common/CandidatesFaces';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import CardHover from '../common/Cards/CardHover';
import BasicCard from '../common/Cards/BasicCard';
import ArticleCard from '../common/Cards/ArticleCard';
import VideoResponsive from '../common/Videos/VideoResponsive';
import candidatesVA2017 from '../../data/candidatesVA2017';
import './Home.css';

const Home = props => {
  document.title = 'Local Majority';

  const { articles, candidates, currentStateRaces, pastCandidates } = props;

  return (
    <main className="Home">
      <Slider
        slides={[
          {
            src: './images/local_majority_banner.png',
            alt: 'local majority logo',
          },
          {
            src: 'https://placekitten.com/900/300',
            alt: 'place kitten 900 by 300',
          },
          {
            src: './images/local_majority_banner.png',
            alt: 'local majority logo',
          },
          {
            src: 'https://placekitten.com/600/200',
            alt: 'place kitten 600  by 200',
          },
        ]}
      />

      <section className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">
              State Legislatures are{' '}
              <span className="tertiary-text-color">Key</span>
            </h2>
            <p className="text-center">
              State legislatures not only create the laws that affect the everyday
              lives of their constituents, they also play a critical role in
              determining the districts for the U.S. House of Representatives and
              thus the fate of the entire country. Local Majority provides
              research that is practical and accessible to support progressive
              campaigns for state legislature. Join us or support our efforts!
            </p>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">
              Our Latest <span className="tertiary-text-color">Reports</span>
            </h2>
            <p className="text-center">
              Read <Link to="./reports">here</Link> for our latest in-depth
              research reports supporting progressive state district campaigns.
            </p>
          </div>
          {articles && articles.length ? (
            articles.slice(0, 3).map(article => {
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
            <h2 className="col-12">Loading</h2>
          )}
        </div>
      </section>

      <States currentStateRaces={currentStateRaces} />

      <section className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">
              Our Featured <span className="tertiary-text-color">Candidates</span>
            </h2>
            <p className="text-center">
              Click <Link to="./candidates">here</Link> for all the progressive
              state district campaigns we are supporting with our research.
            </p>
          </div>
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
                  <BasicCard
                    title={candidate.title}
                    subtitle={seatTitle}
                    route={`candidates/${candidate.state.title}`}
                    slug={candidate.slug}
                    imageSrc={headshotUrl}
                  />
                </GridXSmallIsOneSmallIsThree>
              );
            })
          ) : (
            <h2 className="col-12">Loading</h2>
          )}
        </div>
      </section>

      <Slider
        slides={[
          {
            src: './images/local_majority_banner.png',
            alt: 'local majority logo',
          },
          {
            src: 'https://placekitten.com/900/300',
            alt: 'place kitten 900 by 300',
          },
          {
            src: 'https://placekitten.com/600/200',
            alt: 'place kitten 600  by 200',
          },
          {
            src: './images/local_majority_banner.png',
            alt: 'local majority logo',
          },
          {
            src: 'https://placekitten.com/1200/300',
            alt: 'place kitten 1200 by 300',
          },
          {
            src: 'https://placekitten.com/600/300',
            alt: 'place kitten 600 by 300',
          },
        ]}
      />

      <CandidatesFaces
        candidatesVA2017={candidatesVA2017}
        candidates={candidates}
      />

      <Parallax />

      <section className="container">
        <div className="row">
          <div className="col-12 order-2 col-md-6 order-md-1">
            <VideoResponsive
              key="vimeo-220517251"
              title="Local Majority"
              src="https://player.vimeo.com/video/220517251"
            />
          </div>
          <div className="col-12 order-1 col-md-6 order-md-2">
            <h4 className="text-center">It's all about</h4>
            <h2 className="text-center">
              Saving our <span className="tertiary-text-color">Democracy</span>
            </h2>
            <p className="text-center">It's time to flip the country blue</p>
            <p className="text-center">
              Help us take back state legislatures in November.
            </p>
            <p className="text-center">BLUE IN 2018!</p>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">
              Take Action <span className="tertiary-text-color">Now!</span>
            </h2>
            <p className="text-center">Register to Vote</p>
            <p className="text-center">
              Check your Voter Registration is Current
            </p>
            <p className="text-center">Register to Vote by Mail</p>
            <p className="text-center">Reach out to People from your State</p>
            <p className="text-center">Volunteer to Get out the Vote</p>
            <p className="text-center">Donate to Progressive Candidates</p>
            <p className="text-center">
              Click <Link to="./take-action">here</Link> to make a difference in
              2018.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
