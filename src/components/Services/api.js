const getAllFilms = async () => {
  const URL = 'https://swapi.co/api/films';
  try {
    const res = await fetch(URL);
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getDetail = async query => {
  const URL = `https://swapi.co/api${query}`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const search = async query => {
  const URL = `https://swapi.co/api/${query}`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default {
  getDetail,
  search,
  getAllFilms,
};
