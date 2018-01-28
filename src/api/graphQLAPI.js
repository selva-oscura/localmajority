import gql from 'graphql-tag';

const PROJECT_ID = 'cj9mz2ija00wh01583casvk69';

const endpoints = {
  graphQL: 'https://api.graph.cool/simple/v1/' + PROJECT_ID,
  imageUpload: 'https://api.graph.cool/file/v1/' + PROJECT_ID,
};

const queries = {
  AllStatesCandidates: gql`
    query allStatesCandidates {
      allStates {
        abbrev
        title
        seats {
          id
          primers {
            id
          }
          regionKind
          regionName
          title
          contestIds {
            electionDate
            title
            candidateIds {
              id
              bioText
              campaignEmail
              donateUrl
              facebook
              firstName
              headshotId {
                id
                url
              }
              homepageUrl
              lastName
              partyId {
                id
                title
              }
              state {
                id
                abbrev
              }
              summaryText
              title
              twitter
              volunteerUrl
            }
          }
        }
      }
    }
  `,
  SingleStateByAbbrevCandidatesBasics: gql`
    query SingleStateCandidatesBasics($abbrev: String!) {
      State(abbrev: $abbrev) {
        id
        title
        abbrev
        candidates {
          id
          title
          summaryText
          slug
          contestId {
            electionDate
            seatId {
              title
            }
          }
          headshotId {
            url
          }
        }
      }
    }
  `,
  CandidateDetail: gql`
    query CandidateDetail($id: ID!) {
      Candidate(id: $id) {
        id
        title
        bioText
        campaignEmail
        contestId {
          electionDate
          seatId {
            lat
            lng
            regionKind
            regionName
            slug
            title
          }
        }
        donateUrl
        facebook
        firstName
        lastName
        headshotId {
          id
          url
        }
        homepageUrl
        partyId {
          title
        }
        primers {
          articleType
          author
          updatedAt
          sections
          title
        }
        summaryText
        state {
          id
          abbrev
          title
        }
        twitter
      }
    }
  `,
  CandidatesBasics: gql`
    query CandidatesBasics {
      allCandidates {
        id
        title
        summaryText
        slug
        state {
          abbrev
          title
        }
        contestId {
          electionDate
          seatId {
            title
          }
        }
        headshotId {
          url
        }
      }
    }
  `,
  Candidates: gql`
    query Candidates {
      allCandidates {
        id
        title
        summaryText
        twitter
        facebook
        campaignEmail
        homepageUrl
        state {
          abbrev
          title
        }
      }
    }
  `,
  SeatsBasics: gql`
    query SeatsBasics {
      allSeats {
        id
        title
        slug
        state {
          id
          title
        }
        regionKind
        contestIds {
          title
          electionDate
          candidateIds {
            id
            title
            slug
          }
        }
      }
    }
  `,
  Parties: gql`
    query Parties {
      allParties {
        id
        title
        color
        homepageUrl
        iconUrl
      }
    }
  `,
  States: gql`
    query States {
      allStates {
        abbrev
        title
      }
    }
  `,
};

const graphQLAPI = {
  endpoints,
  queries,
};
export default graphQLAPI;
