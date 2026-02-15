import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import themeReducer from './themeSlice';
import bookmarksReducer from './bookmarksSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    theme: themeReducer,
    bookmarks: bookmarksReducer,
  },
});
