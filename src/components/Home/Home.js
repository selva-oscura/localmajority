import React from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import FeaturedReports from '../Reports/FeaturedReports';
import States from '../States/States';
import BasicCard from '../common/Cards/BasicCard';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import TextlessParallax from '../common/Parallax/TextlessParallax';
import Section from '../common/Section/Section';
import Slider from '../common/Sliders/Slider';
import VideoResponsive from '../common/Videos/VideoResponsive';
import './Home.css';

const Home = props => {
  document.title = 'Local Majority';

  const { articles, candidates, currentStateRaces, pastCandidates } = props;
  const featuredArticles = articles.slice(0, 3);
  const slides1 = [
    {
      src: './images/local_majority_banner.png',
      alt: 'local majority logo',
    },
    {
      src: './images/va-candidates-faces.png',
      alt: '1431 by 868',
    },
    {
      src: './images/constitution.jpg',
      alt: 'constitution',
    },
    {
      src: 'https://placekitten.com/600/200',
      alt: 'place kitten 600  by 200',
    },
  ];
  console.log('candidates in home', candidates);
  return (
    <article className="Home">
      <Section hasContainer={false}>
        <Slider slides={slides1} />
      </Section>

      <Section
        hasContainer={true}
        spacingAbove={3}
        spacingBelow={3}
        background="medium"
      >
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">
              State Legislatures are{' '}
              <span className="tertiary-text-color">Key</span>
            </h2>
            <p className="text-center">
              State legislatures not only create the laws that affect the
              everyday lives of their constituents, they also play a critical
              role in determining the districts for the U.S. House of
              Representatives and thus the fate of the entire country. Local
              Majority provides research that is practical and accessible to
              support progressive campaigns for state legislature. Join us or
              support our efforts!
            </p>
          </div>
        </div>
      </Section>

      <Section hasContainer={true} spacingAbove={3} spacingBelow={3}>
        <FeaturedReports articles={featuredArticles} />
      </Section>

      <Section
        hasContainer={true}
        spacingAbove={3}
        spacingBelow={3}
        background="light"
      >
        <States currentStateRaces={currentStateRaces} />
      </Section>

      <Section hasContainer={true} spacingAbove={3} spacingBelow={3}>
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">
              Our Featured{' '}
              <span className="tertiary-text-color">Candidates</span>
            </h2>
            <p className="text-center">
              Click <Link to="./candidates">here</Link> for all the progressive
              state district campaigns we are supporting with our research.
            </p>
          </div>
          {candidates && candidates.length ? (
            candidates.map((candidate, i) => (
              <GridXSmallIsOneSmallIsThree key={i}>
                <BasicCard
                  title={candidate.title}
                  subtitle={candidate.seatShortTitle}
                  route={`candidates/${candidate.state.slug}`}
                  slug={candidate.slug}
                  imageSrc={candidate.imageSm}
                />
              </GridXSmallIsOneSmallIsThree>
            ))
          ) : (
            <h2 className="col-12">Loading</h2>
          )}
        </div>
      </Section>

      <Section>
        <TextlessParallax
          imgSrc="/images/constitution.jpg"
          strength="500"
          height="50"
        />
      </Section>

      <Section
        hasContainer={true}
        spacingAbove={3}
        spacingBelow={3}
        background="medium"
      >
        <div className="row">
          <div className="col-12 order-2 col-md-6 order-md-1">
            <VideoResponsive
              key="youtube-eT2gSrO_v4g"
              title="Local Majority"
              src="https://www.youtube.com/embed/eT2gSrO_v4g?start=1&amp;wmode=transparent&rel=0"
            />
          </div>
          <div className="col-12 order-1 col-md-6 order-md-2">
            <h3 className="text-left">It's all about</h3>
            <h2 className="text-left">
              Saving our <span className="tertiary-text-color">Democracy</span>
            </h2>
            <p className="text-left">
              It's time to flip the country{' '}
              <span className="primary-text-color">blue</span>
            </p>
            <p className="text-left">
              Help us take back state legislatures in November.
            </p>
            <h2 className="text-left primary-text-color">BLUE IN 2018!</h2>
          </div>
        </div>
      </Section>

      <Section hasContainer={true} spacingAbove={3} spacingBelow={3}>
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
            <div style={{ textAlign: 'center' }}>
              <RaisedButton
                containerElement={<Link to="./take-action" />}
                primary={true}
                label="Take Action"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section hasContainer={false}>
        <TextlessParallax
          imgSrc="/images/constitution.jpg"
          strength="800"
          height="400"
        />
      </Section>
    </article>
  );
};

export default Home;
