import React from 'react';
import './Home.css';
import Aside from '../common/Aside';
import VADistrictMap from '../Maps/VADistrictMap';
import Card from '../common/Card';

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
                  id={article.path}
                  cardTitle={article.title}
                  cardSubtitle="need author for articles"
                  cardText={article.description}
                  imgSrc="ImageSourceNeeded"
                  category="article"
                  friendlyId={article.friendlyId}
                  imgShape="landscape"
                />
              ))
            ) : (
              <h2>Loading</h2>
            )}
          </div>
          <h3>Featured Candidates</h3>
          <div className="flex">
            {candidates.length ? (
              candidates.map((candidate, i) => {
                let headshot = candidate.headshotSm && candidate.headshotSm.url
                  ? candidate.headshotSm.url
                  : 'missing image';
                return (
                  <Card
                    key={i}
                    id={candidate.id}
                    cardTitle={candidate.title}
                    cardText="need to add once we have data"
                    imgSrc={headshot}
                    category="candidates"
                    friendlyId={candidate.friendlyId}
                    imgShape="square"
                  />
                );
              })
            ) : (
              <h2>Loading</h2>
            )}
          </div>
        </article>
        <Aside twitterHandles={['local_majority']} />
      </div>
    </div>
  );
};

export default Home;
