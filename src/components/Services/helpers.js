const dataFetch = async url => {
  try {
    const res = await fetch(`${url}?format=json`);
    return await res.json();
  } catch (err) {
    return null;
  }
};

const convertArrToObject = async (obj, type) => {
  if (obj[type]) {
    const chars = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const char of obj[type]) {
      // eslint-disable-next-line no-await-in-loop
      chars.push(await dataFetch(char));
    }
    return chars;
  }
  return null;
};

export default {
  convertArrToObject,
};
