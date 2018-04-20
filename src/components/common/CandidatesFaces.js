import React from 'react';

const CandidatesFaces = ({candidatesVA2017, candidates}) => {
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
		<section>	
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
	);

}

export default CandidatesFaces;
