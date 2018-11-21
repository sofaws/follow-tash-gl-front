exports.hasProperties = (object = {}, properties = []) => {
  const keys = Object.keys(object);

  if (keys.length === 0 || properties.length === 0) {
    return false;
  }

  return properties.every(property => {
    return object.hasOwnProperty(property);
  });
};

exports.every = (array = [], fn) => {
  if (array.length === 0) {
    return false;
  }

  return array.every(item => fn(item));
};

exports.getAllMatches = (regex, text) => {
  let match = [];
  const result = [];
  while ((match = regex.exec(text)) !== null) {
    result.push(match);
  }

  return result;
};
