import React from 'react';
import './Home.css';
import Aside from '../common/Aside';
import Card from '../common/Cards/Card';

const Home = props => {
  document.title = 'Local Majority';
  // console.log('from Home', props);
  let { candidates } = props;
  // let { articles, candidates } = props;
  // let issuePrimers = articles.filter(a => a.type === 'IssuePrimer');
  return (
    <div className="Home">
      <div className="main-and-aside">
        <article className="Main">
          <img src="../images/faces.png" alt="faces of candidates" />
          <h2 className="text-center">Working Locally to Take Back State Legislatures</h2>
          <p className="text-center">Local Majority provides research and other support for small state legislative campaigns who may not have many resources. Our goal is to build from the grassroots the local support that will help Democrats take back state legislatures across the country, beginning with Virginia in 2017, and continuing with Florida, Michigan and Minnesota in 2018.</p>
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
