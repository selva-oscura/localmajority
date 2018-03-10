import gql from 'graphql-tag';

const PROJECT_ID = 'cj9mz2ija00wh01583casvk69';

const endpoints = {
  graphQL: 'https://api.graph.cool/simple/v1/' + PROJECT_ID,
  imageUpload: 'https://api.graph.cool/file/v1/' + PROJECT_ID,
};

const queries = {
  ArticlesBasics: gql`
    query ArticlesBasics {
      allArticles {
        id
        articleType
        author
        createdAt
        slug
        title
        updatedAt
      }
    }
  `,
  ArticleDetailBySlug: gql`
    query ArticleDetail($slug: String!) {
      Article(slug: $slug) {
        id
        articleType
        author
        content
        createdAt
        slug
        title
        updatedAt
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
          id
          electionDate
          seatId {
            id
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
          id
          title
        }
        primers {
          id
          articleType
          author
          updatedAt
          content
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
          id
          abbrev
          title
        }
        contestId {
          id
          electionDate
          seatId {
            id
            title
          }
        }
        headshotId {
          id
          url
        }
      }
    }
  `,
  CandidateDetailBySlug: gql`
    query CandidateDetail($slug: String!) {
      Candidate(slug: $slug) {
        id
        title
        bioText
        campaignEmail
        donateUrl
        facebook
        firstName
        lastName
        homepageUrl
        summaryText
        twitter
        updatedAt
        contestId {
          id
          electionDate
          seatId {
            id
            lat
            lng
            regionKind
            regionName
            slug
            title
          }
          updatedAt
        }
        headshotId {
          id
          url
          updatedAt
        }
        partyId {
          id
          title
          updatedAt
        }
        primers {
          id
          articleType
          author
          content
          title
          updatedAt
        }
        state {
          id
          abbrev
          title
          updatedAt
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
          id
          abbrev
          title
        }
      }
    }
  `,
  IssuesBasics: gql`
    query IssuesDetails {
      allIssues {
        id
        title
        slug
      }
    }
  `,
  SeatsBasics: gql`
    query SeatsBasics {
      allSeats {
        id
        title
        slug
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
        state {
          id
          title
        }
      }
    }
  `,
  SeatDetail: gql`
    query SeatDetail($id: ID!) {
      Seat(id: $id) {
        id
        regionKind
        slug
        title
        contestIds {
          id
          title
          electionDate
          updatedAt
          candidateIds {
            id
            title
            slug
            updatedAt
          }
        }
        primers {
          articleType
          author
          author
          content
          title
          updatedAt
        }
        state {
          title
          updatedAt
        }
      }
    }
  `,
  SeatDetailBySlug: gql`
    query SeatDetail($slug: String!) {
      Seat(slug: $slug) {
        id
        title
        regionKind
        slug
        state {
          id
          title
          updatedAt
        }
        primers {
          id
          articleType
          author
          content
          title
          updatedAt
        }
        contestIds {
          id
          title
          electionDate
          updatedAt
          candidateIds {
            id
            title
            slug
            updatedAt
            headshotId {
              id
              url
              updatedAt
            }
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
        id
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
