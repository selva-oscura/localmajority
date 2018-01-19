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
};

const graphQLAPI = {
  endpoints,
  queries,
};
export default graphQLAPI;
