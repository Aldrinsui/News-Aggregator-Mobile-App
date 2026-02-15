import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const newsApi = {
  getTopHeadlines: async (category = 'general', country = 'us') => {
    try {
      const response = await axios.get(`${BASE_URL}/top-headlines`, {
        params: {
          country,
          category,
          apiKey: API_KEY,
          pageSize: 50,
        },
      });
      return response.data.articles;
    } catch (error) {
      console.error('Error fetching headlines:', error);
      throw error;
    }
  },

  searchNews: async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/everything`, {
        params: {
          q: query,
          apiKey: API_KEY,
          pageSize: 50,
          sortBy: 'publishedAt',
        },
      });
      return response.data.articles;
    } catch (error) {
      console.error('Error searching news:', error);
      throw error;
    }
  },
};
