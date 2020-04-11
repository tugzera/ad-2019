// Split the list in 2 parts
const splitList = (index, list) => {
  var a = list.slice(0, index);
  var b = list.slice(index, list.length);
  return [a, b];
};

// Randomize the list of friends
const randomSorter = (list) => {
  return list.slice(0).sort(() => {
    return 0.5 - Math.random();
  });
};

// Group list items in pairs
const makePairs = (list) => {
  return list[0].map((_, i) => {
    return list.map((item) => {
      return item[i];
    });
  });
};

// Return full list with each friend sorted
const makeSortedList = (list) => {
  const pairedList = makePairs(splitList(list.length / 2, randomSorter(list)));
  var fullList = [];
  for (let i = 0; i < pairedList.length; i++) {
    if (i === pairedList.length - 1) {
      fullList.push(pairedList[i]);
      fullList.push([pairedList[i][1], pairedList[0][0]]);
      break;
    }
    fullList.push(pairedList[i]);
    fullList.push([pairedList[i][1], pairedList[i + 1][0]]);
  }
  return fullList;
};

export default makeSortedList;
