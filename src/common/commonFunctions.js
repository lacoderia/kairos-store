export const arrayToHash = data => {
  return data.reduce(function(map, item) {
    map[item.id] = item;
    return map;
  }, {});
}

const commonFunctions = {
  arrayToHash,
};

export default commonFunctions;
