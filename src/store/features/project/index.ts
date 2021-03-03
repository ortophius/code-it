/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState: ProjectState = {
  title: '',
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    updateProjectInfo: (state, action) => ({
      ...state,
      ...action.payload,
      notFound: false,
    }),
    notFound: (state) => {
      state.notFound = true;
    },
  },
});

export const selectProject = (state: RootState) => state.project;

export const projectReducer = projectSlice.reducer;
export const { updateProjectInfo, notFound } = projectSlice.actions;
