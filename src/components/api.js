import axios from "axios";

// https://api.themoviedb.org/3/movie/550?api_key=96525b58fad95f33b6786cec803d2857

// const options = {};

const URL = "https://api.themoviedb.org/3";
// const URL = "https://api.themoviedb.org";
const KEY = "96525b58fad95f33b6786cec803d2857";

export default async function getApi() {
  const data = await axios.get(`${URL}/trending/movie/day?api_key=${KEY}`);

  return data.data;
}
