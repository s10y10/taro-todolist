const toCamelCase = (str) => {
  return str.replace(/_([a-z])/g, function (match, letter) {
    return letter.toUpperCase();
  });
};

const formatData = (data) => {
  if (!data) return null;
  if (Array.isArray(data)) {
    return data.concat();
  }
  if (typeof data !== 'object') {
    return data;
  }
  const newObj = {};
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const newKey = toCamelCase(key);
      try {
        newObj[newKey] = JSON.parse(data[key]);
      } catch (e) {
        newObj[newKey] = data[key];
      }
    }
  }
  return newObj;
};

const getResBody = (data, success = 1, code = 200) => {
  const body = {
    success: !!success,
    code,
    data: formatData(data),
  };
  return body;
};

const getReqParams = (ctx, key) => {
  const method = ctx.request.method;
  const params = method === 'POST' ? ctx.request.body[key] : ctx.query[key];
  return params;
};

module.exports = {
  getResBody,
  getReqParams,
};
