import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const API_KEY = "38d26d5420ad44e380c498c72e95d3e8";
const QUERY = "bitcoin";

const mapArticle = (article) => {
  article.id = uuidv4();
  return article;
};
export const getFeed = ({ pageParam = 1 }) => {
  return axios
    .get(
      `https://newsapi.org/v2/everything?q=${QUERY}&apiKey=${API_KEY}&page=${pageParam}`
    )
    .then((response) => {
      response.data.articles = response.data.articles.map(mapArticle);
      return response.data;
    });
};
