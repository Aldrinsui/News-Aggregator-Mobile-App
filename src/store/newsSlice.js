import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { newsApi } from '../services/newsApi';

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ category = 'general' }) => {
    const articles = await newsApi.getTopHeadlines(category);
    return { articles, category };
  }
);

export const searchNews = createAsyncThunk(
  'news/searchNews',
  async (query) => {
    const articles = await newsApi.searchNews(query);
    return articles;
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    category: 'general',
    loading: false,
    error: null,
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.category = action.payload.category;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(searchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCategory } = newsSlice.actions;
export default newsSlice.reducer;
