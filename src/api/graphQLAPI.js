import gql from "graphql-tag";

const endpoints = {
  graphQL: "http://localhost:9000/gql"
};

// const queries = {

// };

// query {
//   articles (where:{title_starts_with: "ar"}, orderBy: createdAt_ASC){
//     title
//     slug
//     createdAt
//   }
// }

// query {
// 	offices {
//     title
//   }
// }

// -- GOOD ONE WAS BELOW --
// query($where:ArticlesByTagWhereInput) {
//   articlesByTag(where: $where) {
//     id
//     title
//     tags {
//       slug
//     }
//   }
// }

// {
//   "where": {
//     "tagWhere": { "tag_slug_in": "economy"}
//   }
// }

const queries = {
  Articles: gql`
    query Articles {
      articles {
        id
        title
        author
        slug
        imageSm {
          id
          url
        }
        tags {
          slug
          title
        }
        updatedAt
      }
    }
  `,
  ArticlesByTag: gql`
    query ArticlesByTag($tag: String!) {
      articles(where: { tagWhere: { tag_slug_eq: $tag } }) {
        id
        title
        author
        slug
        imageSm {
          id
          url
        }
        tags {
          isTLIssue
          isTopic
          slug
          title
        }
        updatedAt
      }
    }
  `,
  ArticleDetailBySlug: gql`
    query ArticleDetail($slug: String!) {
      articles(where: { slug: $slug }) {
        id
        title
        author
        slug
        content_html
        content_rt
        imageHero {
          id
          url
        }
        tags {
          slug
          title
        }
        updatedAt
      }
    }
  `,
  Candidates: gql`
    query Candidates {
      candidates {
        id
        title
        slug
        summary_html
        summary_rt
        state {
          title
          abbrev
        }
        office {
          id
          title
          chamber {
            id
            title
            name
          }
          elections {
            id
            title
            electionDate
          }
        }
        party {
          id
          title
        }
        imageSm {
          id
          url
        }
      }
    }
  `,
  CandidateDetailBySlug: gql`
    query CandidateDetail($slug: String!) {
      candidates(where: { slug: $slug }) {
        id
        title
        firstName
        lastName
        slug
        summary_html
        summary_rt
        bio_html
        bio_rt
        homepageUrl
        donateUrl
        volunteerUrl
        campaignEmail
        lmEndorsed
        twitter
        facebook
        tags {
          slug
          title
        }
        state {
          id
          title
        }
        office {
          id
          title
          districtName
          regionKind
          imageMap {
            id
            url
          }
          imageMapInState {
            id
            url
          }
          chamber {
            id
            title
            name
          }
          elections {
            id
            title
            electionDate
          }
        }
        party {
          id
          title
        }
        imageSm {
          id
          url
        }
      }
    }
  `,
  Parties: gql`
    query Parties {
      parties {
        id
        title
        color
        homepageUrl
        iconUrl
        slug
      }
    }
  `,
  States: gql`
    query States {
      states {
        id
        abbrev
        title
        slug
        imageSm {
          id
          url
        }
        imageMap {
          id
          url
        }
      }
    }
  `,
  StateDetailByAbbrev: gql`
    query StateDetailByAbbrev($abbrev: String!) {
      states(where: { abbrev: $abbrev }) {
        id
        title
        abbrev
        slug
        flagUrl
        imageHero {
          id
          url
        }
        imageMap {
          id
          url
        }
        summary_html
        summary_rt
        content_html
        content_rt
        tags {
          title
          slug
        }
        updatedAt
      }
    }
  `,
  StateDetailBySlug: gql`
    query StateDetail($slug: String!) {
      states(where: { slug: $slug }) {
        id
        title
        slug
        flagUrl
        imageHero {
          id
          url
        }
        imageMap {
          id
          url
        }
        summary_html
        summary_rt
        content_html
        content_rt
        tags {
          title
          slug
        }
        updatedAt
      }
    }
  `,
  Tags: gql`
    query Tags {
      tags {
        id
        title
        slug
        isTopic
        isTLIssue
        isAdmin
      }
    }
  `
};

const graphQLAPI = {
  endpoints,
  queries
};

export default graphQLAPI;

// Articles
// ArticleDetailBySlug
// Candidates
// CandidateDetailBySlug
// Parties
// States
// StateDetailBySlug
// Tags

// not seeing how to pull Article by slug (doesn't seem to consider ArticlesByUniqueInput to be a valid option for slugs, just for id)
