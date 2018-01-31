import React from 'react';
import './Home.css';
import Aside from '../common/Aside';
import VADistrictMap from '../Maps/VADistrictMap';
import Card from '../common/Cards/Card';

const Home = props => {
  document.title = 'Local Majority';
  // console.log('from Home', props);
  let { candidates } = props;
  // let { articles, candidates } = props;
  // let issuePrimers = articles.filter(a => a.type === 'IssuePrimer');
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
          <h3>Featured Candidates</h3>
          <div className="flex">
            {candidates && candidates.length ? (
              candidates.map((candidate, i) => (
                <Card
                  key={i}
                  id={candidate.id}
                  cardTitle={candidate.title}
                  cardText={candidate.contestId.seatId.title}
                  imgSrc={candidate.headshotId.url}
                  category="candidates"
                  slug={candidate.slug}
                  imgShape="square"
                />
              ))
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
