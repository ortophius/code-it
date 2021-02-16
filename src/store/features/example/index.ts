/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const start = (state: IExample) => {
  state.msg = 'Hello World';
};

const initialState = {
  msg: 'Loading...',
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    start,
  },
});

export const selectExampleMsg = (state: ExampleState) => state.example.msg;

export const exampleReducer = exampleSlice.reducer;
