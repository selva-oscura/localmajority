/*
getMostRecentUpdateTimestamp
	INPUT: data -- the resolved, successful graphql query
	OUTPUT: the most recent updatedAt's timestamp
*/
export function getMostRecentUpdateTimestamp(data) {
  let mostRecent = -Infinity;

  const checkObject = obj => {
    Object.keys(obj).forEach(key => {
      if (key === "updatedAt") {
        let timestamp = new Date(obj[key]).getTime();
        mostRecent = Math.max(timestamp, mostRecent);
      } else if (Array.isArray(obj[key])) {
        checkArray(obj[key]);
      } else if (obj[key] instanceof Object) {
        checkObject(obj[key]);
      }
    });
  };

  const checkArray = arr => {
    arr.forEach(val => {
      if (Array.isArray(val)) {
        checkArray(val);
      } else if (val instanceof Object) {
        checkObject(val);
      }
    });
  };

  Array.isArray(data) ? checkArray(data) : checkObject(data);

  return mostRecent;
}

/*
PRETTIFYING Dates and Times
NOTE REGARDING INPUTS:
	timestamp is the result of new Date().getTime()
		e.g. 1517385346000
	dateString is the string output of new Date()
		e.g. "2018-01-31T07:55:46.000Z"
*/
export function prettifyDate(dateString) {
  let datetime = new Date(dateString);
  return datetime.toLocaleDateString("en-US");
}

export function prettifyDateAndTime(dateString) {
  let datetime = new Date(dateString);
  return `${datetime.toLocaleDateString(
    "en-US"
  )}, ${datetime.toLocaleTimeString("en-US")}`;
}

export function prettifyTimestamp(timestamp) {
  let datetime = new Date(timestamp);
  return `${datetime.toLocaleDateString(
    "en-US"
  )}, ${datetime.toLocaleTimeString("en-US")}`;
}

export function arrayToSentenceWithCommasAndAnd(arr) {
  if (arr.length === 1) {
    return arr[0];
  } else if (arr.length === 2) {
    return arr.join(" and ");
  } else if (arr.length > 2) {
    arr[arr.length - 1] = `and ${arr[arr.length - 1]}`;
    return arr.join(", ");
  } else {
    return null;
  }
}

export function strToTitleCase(str) {
  return str
    .split(" ")
    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default {
  getMostRecentUpdateTimestamp,
  prettifyDate,
  prettifyDateAndTime,
  prettifyTimestamp,
  arrayToSentenceWithCommasAndAnd,
  strToTitleCase
};
