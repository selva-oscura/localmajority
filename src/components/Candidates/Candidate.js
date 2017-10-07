import React from 'react';
import CandidateAside from './CandidateAside';
import './Candidate.css';

const Candidate = (props) => {
  // return <p>candidate</p>;
	console.log('props from Candidate',props);
	let candidate = props.candidate;
	// candidate = Object.assign({}, candidate, {
	// 	address: {
	// 		street: "PO Box 5113",
 // 			city: "Woodbridge",
	// 		state: "VA",
	// 		zip: "22194",
	// 	},
	// 	phone: "571-989-1713",
	// 	fax: null,
	// 	email: "jennifercarrollfoy@gmail.com",
	// 	twitter: "JCarrollFoy",
	// 	facebook: "JenniferCarrollFoy",
	// });
  return (
    <div className="Candidate">
      <article>
        <div className="row">
          <div className="brief-info">
            <h2>{candidate.title}</h2>
            <h3>{candidate.district ? candidate.district : "no district data"}</h3>
            <p className="hide-on-small">{candidate.descriptionText ? candidate.descriptionText : "no descriptionText"}</p>
          </div>
          <div className="headshot">
            <img
              src={`../${candidate.headshotSm.url}`}
              alt={candidate.title}
            />
          </div>
          <p className="show-on-small">{candidate.descriptionText ? candidate.descriptionText : "no descriptionText"}</p>
        </div>
        <div className="main-and-aside">
          <div className="Main">
            <div className="row">
              <h2>Why this Race Matters</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
            </div>
            <div className="row">
              <h2>Comparing Candidates</h2>
              <div className="row">
                <div className="half">
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                </div>
                <div className="half">
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                </div>
              </div>
            </div>
            <div className="row">
              <h2>Why &amp; Why Not</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
            </div>
          </div>
          <CandidateAside candidate={candidate} />
        </div>
      </article>
    </div>
  );
};

export default Candidate;
