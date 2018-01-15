import React from 'react';
import './Aside.css';
import TwitterTimeline from './TwitterTimeline';

const Aside = props => {
  console.log('props', props);
  const twitterHandles = props.twitterHandles;
  // return (
  //   <aside id="Aside">
  //     {twitterHandles.map((twitterHandle, i) => (
  //       <TwitterTimeline key={i} twitterHandle={twitterHandle} />
  //     ))}
  //   </aside>
  // );
  // return (
  //   { twitterHandles &&
  //   	twitterHandles.length &&
  //   	(<aside id="Aside">
  //       {twitterHandles.map((twitterHandle, i) => (
  //         <TwitterTimeline key={i} twitterHandle={twitterHandle} />
  //       ))}
  //     </aside>)
  // 	}
  // );
  return null;
};

export default Aside;
