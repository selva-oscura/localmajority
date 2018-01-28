export function standardizeDate(dateString){
	return `${dateString.slice(5, 7)}/${dateString.slice(8,10)}/${dateString.slice(0, 4)}`
};
