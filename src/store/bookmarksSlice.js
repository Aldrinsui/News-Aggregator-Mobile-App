import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = '@bookmarks';

export const loadBookmarks = createAsyncThunk(
  'bookmarks/load',
  async () => {
    const data = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  }
);

export const saveBookmark = createAsyncThunk(
  'bookmarks/save',
  async (article, { getState }) => {
    const { bookmarks } = getState().bookmarks;
    const updated = [...bookmarks, article];
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    return article;
  }
);

export const removeBookmark = createAsyncThunk(
  'bookmarks/remove',
  async (url, { getState }) => {
    const { bookmarks } = getState().bookmarks;
    const updated = bookmarks.filter(b => b.url !== url);
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    return url;
  }
);

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    bookmarks: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBookmarks.fulfilled, (state, action) => {
        state.bookmarks = action.payload;
      })
      .addCase(saveBookmark.fulfilled, (state, action) => {
        state.bookmarks.push(action.payload);
      })
      .addCase(removeBookmark.fulfilled, (state, action) => {
        state.bookmarks = state.bookmarks.filter(b => b.url !== action.payload);
      });
  },
});

export default bookmarksSlice.reducer;
