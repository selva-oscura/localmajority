import React from 'react';
import './Home.css';
import Aside from '../common/Aside';
import VADistrictMap from '../Maps/VADistrictMap';
import Card from '../common/Card';
import CandidateCard from '../Candidates/CandidateCard';

const Home = props => {
  document.title = 'Local Majority';
  let { articles, candidates, talkingPoints } = props;
  return (
    <div className="Home">
      <div className="map-and-text">
        <div id="image">
          <VADistrictMap />
        </div>
        <div className="caption">
          <h2>November 7, 2017 .... It Starts with Virginia</h2>
          <h3>
            Electing a Congress <br />that Represents US
          </h3>
          <h3>
            Polls Open<br />
            22 Days 12 Hours 18 Minutes 5 Seconds
          </h3>
        </div>
      </div>
      <div className="main-and-aside">
        <article className="Main">
          <h3>Featured Articles</h3>
          <div className="flex">
            {articles.length ? (
              articles.map((article, i) => (
                <Card
                  key={`article-${i}`}
                  title={article.title}
                  text={article.description}
                  imgSrc="ImageSourceNeeded"
                  category="articles"
                  id={article.path}
                  imgShape="landscape"
                />
              ))
            ) : (
              <h2>Loading</h2>
            )}
          </div>
          <h3>Featured Candidates</h3>
          <div className="flex">
            {candidates.length ? <h2>Candidates Here</h2> : <h2>Loading</h2>}
          </div>
        </article>
        <Aside twitterHandles={['local_majority']} />
      </div>
    </div>
  );
};

export default Home;
// candidates.map((candidate, i) => {
//   let headshot = candidate.headshotSm && candidate.headshotSm.data ? candidate.headshotSm.data : "incomplete data";
//   return (
//     <CandidateCard
//       key={`candidate-${i}`}
//       title={candidate.title}
//       subtitle="District data"
//       text="missing text"
//       imgSrc={candidate.headshotSm.url}
//       category="candidates"
//       uid={candidate.uid}
//       friendlyId="need"
//       imgShape="square"
//     />
//   )
// })
