const queryFields = [
  {
    tableName: 'Article',
    stateName: 'articles',
    all: 'articles',
    one: 'article',
  },
  {
    tableName: 'Candidate',
    stateName: 'candidates',
    all: 'candidates',
    one: 'candidate',
  },
  {
    tableName: 'Contest',
    stateName: 'contests',
    all: 'contests',
    one: 'contest',
  },
  // {tableName:"District", stateName:"districts", all:"districts", one: "district"},
  {
    tableName: 'DistrictPrimer',
    stateName: 'districtPrimers',
    all: 'district-primers',
    one: 'district-primer',
  },
  // {tableName:"Issue", stateName:"issues", all:"issues", one: "issue"},
  {
    tableName: 'IssuePrimer',
    stateName: 'issuePrimers',
    all: 'issue-primers',
    one: 'issue-primer',
  },
  {
    tableName: 'Party',
    stateName: 'parties',
    all: 'parties',
    one: 'party',
  },
  {
    tableName: 'Seat',
    stateName: 'seats',
    all: 'seats',
    one: 'seat',
  },
  // {tableName:"State", stateName:"states", all: "states", one: "state"},
  {
    tableName: 'TalkingPoints',
    stateName: 'talkingPoints',
    all: 'talking-points',
    one: 'talking-point',
  },
];

export default queryFields;
