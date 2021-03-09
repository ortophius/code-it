/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState: ProjectState = {
  title: '',
  link: '/',
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
    changeTitle: (state, action) => {
      state.title = action.payload;
    },
    notFound: (state) => {
      state.notFound = true;
    },
  },
});

export const selectProject = (state: RootState) => state.project;
export const selectProjectRoot = (state: RootState) => state.project.root;
export const selectProjectTitle = (state: RootState) => state.project.title;
export const selectIsNotFound = (state: RootState) => (!!(state.project.notFound));

export const projectReducer = projectSlice.reducer;
export const { updateProjectInfo, notFound, changeTitle } = projectSlice.actions;
