/*
// deep iterate through json objects e.g
traverse(jsonObj, (obj, key) => {
  if (key === 'someKey') {
    if (obj[key].includes('myString')) {
      obj.someValue = true;
    }
  }
});
*/
function traverse(obj, callback) {
  if (Array.isArray(obj)) {
    obj.forEach((item) => {
      return traverse(item, callback);
    });
  } else if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach((key) => {
      if (obj.hasOwnProperty(key)) {
        callback(obj, key);
        traverse(obj[key], callback);
      }
    });
  }
}

module.exports = {
  traverse,
};
