const queries = {
	allStateCandidates: gql `query allStateCandidates {
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
	      contestIds{
	        electionDate
	        title
	        candidateIds{
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
	}`,
	Parties: gql`query Parties {
		allParties {
			id
			title
			color
			homepageUrl
			iconUrl
		}
	}`
}
	// Candidates: gql`query Candidates {
	// 	allCandidates {
	// 		id
	// 		title
	// 		summaryText
	// 		twitter
	// 		facebook
	// 		campaignEmail
	// 		homepageUrl
	// 		state {
	// 			title
	// 		}
	// 	}
	// }`,
	// Parties: gql`query Parties {
	// 	allParties {
	// 		id
	// 		title
	// 		color
	// 		homepageUrl
	// 		iconUrl
	// 	}
	// }`