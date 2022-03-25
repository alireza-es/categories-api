module.exports = (inputArray = [], parentKey) => {
  const array = [...inputArray];

  const map = {};
  let node;
  const res = [];
  let i;
  for (i = 0; i < inputArray.length; i += 1) {
    map[inputArray[i].id] = i;
    array[i].children = [];
  }
  for (i = 0; i < inputArray.length; i += 1) {
    node = inputArray[i];
    if (node[parentKey] !== null && map[node[parentKey]] !== undefined) {
      array[map[node[parentKey]]].children.push(node);
    } else {
      res.push(node);
    }
  }
  return res;
};
