export const stateFakeData = [
  {
    title: 'Florida',
    text:
      "Democrats make up nearly 50% in this heavily-gerrymandered state but have little representation in state government. Only 40% in the Senate and 33% in the House. It's time to turn the state Blue!",
  },
  {
    title: 'Michigan',
    text:
      "Democrats make up 49.8% of the electorate but are not represented in this heavily-gerrymandered and voter-suppressed state. The Dems only have 43% of the Senate and only 29% of the Senate! With all the term limits, it's time to turn this state back to BLUE!",
  },
  {
    title: 'Minnesota',
    text:
      'All 134 members of the State House are up for election in November 2018, and Democrats only need to flip 11 seats to regain control. In 2016 Hillary carried Minnesota by 1.4%, winning 12 of the districts that are currently occupied by nervous Republicans.',
  },
];

// export const issueTitles = [
//   'Economy',
//   'Justice',
//   'Environment',
//   'Health Care',
//   'Foreign Policy & Defense',
//   'Education',
//   'Technology',
//   'Governance',
// ];

export const issueTitles = ["Abortion", "Budget", "Civil rights", "Crime", "Economy", "Education", "Energy", "Environment", "Foreign Policy", "Government Reform", "Guns", "Health", "Immigration", "Infrastructure", "Military", "Poverty", "Social Security", "Taxes", "Terrorism", "Values"];

export const statesForIssues = ['Michigan', 'Florida', 'Minnesota'];

const createIssuesAndArticlesFakeData = () => {
		let articles = [], 
			  issues = [];
		issueTitles.forEach((title, i) => {
		  let subIssues = [];
		  let date = new Date().toISOString();
		  let author = 'somebody or other';
		  for (let j = 1; j < 5; j++) {
		    const sockPuppetArticles = [];
		    for (let k = 1; k < 4; k++) {
		      let type = '';
		      if (k === 1) {
		        type = 'Talking Points';
		      } else {
		        type = 'Research Article';
		      }
		      let articleTitle = `Fake Article title blah, blah, blah ${title} - ${j} - ${k}`;
		      let numStates = Math.floor(Math.random() * 3);
		      let stateChoice = Math.floor(Math.random() * 3);
		      let statesForArticle = [];
		      if (numStates === 1) {
		        statesForArticle.push(statesForIssues[stateChoice]);
		      } else if (numStates === 2) {
		        statesForArticle = statesForIssues
		          .slice(0, stateChoice)
		          .concat(statesForIssues.slice(stateChoice + 1));
		      }
		      sockPuppetArticles.push({
		        id: `${title}_${j}_${k}`,
		        title: articleTitle,
		        slug: articleTitle
		          .split(' ')
		          .join('-')
		          .toLowerCase(),
		        tags: [title, `sub-topic-${title}-${j}`].concat(statesForArticle),
		        articleType: type,
		        createdAt: date,
		        updatedAt: date,
		        author: author,
		      });
		    }

		    subIssues.push({
		      id: `${title}_${j}`,
		      title: `Fake Subtopic ${title} - ${j}`,
		      slug: `sub-topic-${title}-${j}`,
		    });
		    articles = articles.concat(sockPuppetArticles);
		  }
		  issues.push({
		    id: i,
		    title: title,
		    slug: title
		      .split(' ')
		      .join('-')
		      .toLowerCase(),
		    subIssues: subIssues,
		  });
		});
	return { issues, articles };
}

export const issuesArticlesFakeData = createIssuesAndArticlesFakeData();

// export const issues = [...issuesArticlesFakeData];