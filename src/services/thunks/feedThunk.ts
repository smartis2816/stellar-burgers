import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

export const feedThunk = createAsyncThunk(
  'feed/feedThunk',
  async (_, { rejectWithValue }) => {
    const feed = await getFeedsApi();
    if (!feed?.success) {
      return rejectWithValue(feed);
    }
    return feed;
  }
);
