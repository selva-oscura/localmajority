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
            slug
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
            primers {
              id
              articleType
              author
              content
              title
              updatedAt
            }
          }
          updatedAt
        }
        donateUrl
        facebook
        firstName
        lastName
        headshotId {
          id
          url
          updatedAt
        }
        homepageUrl
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
        summaryText
        twitter
        updatedAt
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
  StateDetailBySlug: gql`
    query StateDetail($slug: String!) {
      State(slug: $slug) {
        id
        slug
        title
        updatedAt
        contestIds {
          id
          electionDate
          seatId {
            id
            slug
            title
          }
          candidateIds {
            id
            slug
            title
            headshotId {
              id
              url
            }
            summaryText
          }
        }
      }
    }
  `,
};

const graphQLAPI = {
  endpoints,
  queries,
};
export default graphQLAPI;
