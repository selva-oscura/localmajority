import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import graphQLAPI from '../../api/graphQLAPI';
import NoSuchDistrict from './NoSuchDistrict';
import Loading from '../common/Loading';
import './District.css';

class District extends Component {
  constructor(props, context) {
    super(props, context);
    const { seat } = this.props;
    if (seat) {
      document.title = `Local Majority | ${seat.title}`;
    } else {
      document.title = 'Local Majority | Unrecognized Seat';
    }
  }

  render() {
    const isLoading = this.props.SeatDetailBySlug.loading;

    if (isLoading) {
      return <Loading />;
    }

    const seat = this.props.SeatDetailBySlug.Seat
      ? this.props.SeatDetailBySlug.Seat
      : this.props.seat;
    if (!seat) {
      return <NoSuchDistrict seatId={this.props.match.params.slug} />;
    }

    const seatMap = seat.mapSmUrl ? seat.mapSmUrl : '';
    const candidates =
      seat && seat.contestIds && seat.contestIds[0].candidateIds
        ? seat.contestIds[0].candidateIds
        : undefined;
    console.log('candidates from Seat', candidates);
    const candidateHeadshot = null;

    return (
      <div className="District">
        <div className="hidden-sm-down">
          <div className="row">
            <div className="col-6">
              <h2>{seat.title}</h2>
              <img
                src={seatMap}
                className="img-fluid"
                alt={`map of district ${seat.title}`}
              />
            </div>
            {candidates ? (
              candidates.map((candidate, i) => (
                <div className="col-6" key={i}>
                  <h2>{candidate.title}</h2>
                  <img
                    src={candidateHeadshot}
                    className="img-fluid"
                    alt={`headshot of distict candidate ${candidate.title}`}
                  />
                </div>
              ))
            ) : (
              <div className="col-6">
                <h2>Previously had candidate headshot here.</h2>
                <p>
                  Will we have multiple candidates here or just 'our' candidate
                  or....?
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="hidden-md-up">
          <div className="row">
            <div className="col">
              <h2>{seat.title}</h2>
              <img
                src={seatMap}
                className="img-fluid"
                alt={`map of district ${seat.title}`}
              />
              <p>
                We seriously need to get some data into Seats, DistrictPrimers,
                etc.....
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(graphQLAPI.queries.SeatDetailBySlug, {
    name: 'SeatDetailBySlug',
    options: props => {
      return { variables: { slug: props.match.params.slug } };
    },
  })
)(District);

// const demographicData = [
//   {
//     topic: 'Median Income',
//     data: [
//       { label: '0-$25,000', value: 30.5, color: '#0f0' },
//       { label: '$25,000-$50,000', value: 44.3, color: '#0d0' },
//       { label: '$50,000-$100,000', value: 17.0, color: '#0b0' },
//       { label: '$100,000-$250,000', value: 6.5, color: '#090' },
//       { label: '$250,000+', value: 1.7, color: '#060' },
//     ],
//   },
//   {
//     topic: 'Age',
//     data: [
//       { label: '0-17', value: 20.7, color: '#f33' },
//       { label: '18-30', value: 18.0, color: '#d33' },
//       { label: '31-45', value: 19.2, color: '#b22' },
//       { label: '46-60', value: 20.3, color: '#911' },
//       { label: '60+', value: 22.3, color: '#700' },
//     ],
//   },
//   {
//     topic: 'Education Level',
//     data: [
//       { label: '<high school', value: 48.5, color: '#90CAF9' },
//       { label: 'High School/GED', value: 44.3, color: '#448AFF' },
//       { label: 'AA', value: 3.0, color: '#2962FF' },
//       { label: 'BA/BS', value: 2.5, color: '#0D47A1' },
//       { label: 'Advanced Degree', value: 1.7, color: '#1A237E' },
//     ],
//   },
//   {
//     topic: 'Race',
//     data: [
//       { label: 'Caucasian', value: 36.5, color: '#FFF9C4' },
//       { label: 'African-American', value: 30.3, color: '#FFF156' },
//       { label: 'Hispanic', value: 4.0, color: '#FFFF00' },
//       {
//         label: 'Native American or Pacific Islander',
//         value: 2.5,
//         color: '#FFD600',
//       },
//       { label: 'Asian', value: 1.3, color: '#FDD835' },
//       { label: 'Biracial/Multiracial', value: 6.7, color: '#F9A825' },
//       { label: 'Decline to State', value: 18.7, color: '#FF6F00' },
//     ],
//   },
// ];
// const politicalData = [
//   {
//     topic: '2016 Presidential Election',
//     data: [
//       { label: 'Clinton (D)', value: 53.5, color: 'blue' },
//       { label: 'Trump (R)', value: 39.0, color: 'red' },
//       { label: 'Stein (G)', value: 2.0, color: 'green' },
//       { label: 'Johnson (I)', value: 2.8, color: 'yellow' },
//       { label: 'Others', value: 0.7, color: 'grey' },
//     ],
//   },
//   {
//     topic: 'Last District Race',
//     data: [
//       { label: 'Democrat', value: 48.5, color: 'blue' },
//       { label: 'Republican', value: 44.3, color: 'red' },
//       { label: 'Green', value: 3.0, color: 'green' },
//       { label: 'Independent', value: 2.5, color: 'yellow' },
//       { label: 'Others', value: 1.7, color: 'grey' },
//     ],
//   },
//   {
//     topic: 'Voter Registration',
//     data: [
//       { label: 'Democrat', value: 38.7, color: 'blue' },
//       { label: 'Republican', value: 31.3, color: 'red' },
//       { label: 'Independent', value: 4.3, color: 'yellow' },
//       { label: 'Green', value: 3.0, color: 'green' },
//       { label: 'Undeclared/Other', value: 22.7, color: 'grey' },
//     ],
//   },
// ];

// console.log('seatId', seatId);
// console.log('seat', seat);

// <h2>Key District Demographic Data</h2>
// <div className="row flex">
//   {demographicData.map((data, i) => (
//     <div key={i}>
//       <PieChart
//         key={i}
//         x={100}
//         y={100}
//         outerRadius={100}
//         innerRadius={0}
//         title={data.topic}
//         data={data.data}
//       />
//     </div>
//   ))}
// </div>
// <h2>Key District Political Data</h2>
// <div className="row flex">
//   {politicalData.map((data, i) => (
//     <div key={i}>
//       <PieChart
//         key={i}
//         x={100}
//         y={100}
//         outerRadius={100}
//         innerRadius={0}
//         title={data.topic}
//         data={data.data}
//       />
//     </div>
//   ))}
// </div>

// <div className="row">
//   <h2>Why this Race Matters</h2>
//   <p>
//     Lorem Ipsum is simply dummy text of the printing and typesetting
//     industry. Lorem Ipsum has been the industry's standard dummy text
//     ever since the 1500s, when an unknown printer took a galley of type
//     and scrambled it to make a type specimen book. It has survived not
//     only five centuries, but also the leap into electronic typesetting,
//     remaining essentially unchanged. It was popularised in the 1960s
//     with the release of Letraset sheets containing Lorem Ipsum passages,
//     and more recently with desktop publishing software like Aldus
//     PageMaker including versions of Lorem Ipsum
//   </p>
// </div>
// <div className="row">
//   <h2>Know the District</h2>
//   <p>
//     Lorem Ipsum is simply dummy text of the printing and typesetting
//     industry. Lorem Ipsum has been the industry's standard dummy text
//     ever since the 1500s, when an unknown printer took a galley of type
//     and scrambled it to make a type specimen book. It has survived not
//     only five centuries, but also the leap into electronic typesetting,
//     remaining essentially unchanged. It was popularised in the 1960s
//     with the release of Letraset sheets containing Lorem Ipsum passages,
//     and more recently with desktop publishing software like Aldus
//     PageMaker including versions of Lorem Ipsum
//   </p>
// </div>
// <div className="row">
//   <h2>Comparing Candidates</h2>
//   <div className="row">
//     <div className="half">
//       {candidate ? <h3>{candidate.title}</h3> : <h3>Our Candidate</h3>}
//       <p>
//         Lorem Ipsum is simply dummy text of the printing and typesetting
//         industry. Lorem Ipsum has been the industry's standard dummy
//         text ever since the 1500s, when an unknown printer took a galley
//         of type and scrambled it to make a type specimen book. It has
//         survived not only five centuries, but also the leap into
//         electronic typesetting, remaining essentially unchanged. It was
//         popularised in the 1960s with the release of Letraset sheets
//         containing Lorem Ipsum passages, and more recently with desktop
//         publishing software like Aldus PageMaker including versions of
//         Lorem Ipsum
//       </p>
//     </div>
//     <div className="half">
//       {candidate ? (
//         <h3>{candidate.title}&apos;s Opponent</h3>
//       ) : (
//         <h3>Our Candidate&apos;s Opponent</h3>
//       )}
//       <p>
//         Lorem Ipsum is simply dummy text of the printing and typesetting
//         industry. Lorem Ipsum has been the industry's standard dummy
//         text ever since the 1500s, when an unknown printer took a galley
//         of type and scrambled it to make a type specimen book. It has
//         survived not only five centuries, but also the leap into
//         electronic typesetting, remaining essentially unchanged. It was
//         popularised in the 1960s with the release of Letraset sheets
//         containing Lorem Ipsum passages, and more recently with desktop
//         publishing software like Aldus PageMaker including versions of
//         Lorem Ipsum
//       </p>
//     </div>
//   </div>
// </div>
// <div className="row">
//   <h2>Why &amp; Why Not</h2>
//   <p>
//     Lorem Ipsum is simply dummy text of the printing and typesetting
//     industry. Lorem Ipsum has been the industry's standard dummy text
//     ever since the 1500s, when an unknown printer took a galley of type
//     and scrambled it to make a type specimen book. It has survived not
//     only five centuries, but also the leap into electronic typesetting,
//     remaining essentially unchanged. It was popularised in the 1960s
//     with the release of Letraset sheets containing Lorem Ipsum passages,
//     and more recently with desktop publishing software like Aldus
//     PageMaker including versions of Lorem Ipsum
//   </p>
// </div>
