import { GET_NEWS } from "./queries/get_news";
import bugsnag from "../bugsnag";

const getNews = async (client, variables) => {
  try {
    const userData = await client.query({
      query: GET_NEWS,
      fetchPolicy: "cache-first",
      variables
    });

    return userData.data.news;
  } catch (e) {
    bugsnag.notify(e);
  }
};

export { getNews };
