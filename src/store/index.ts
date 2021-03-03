import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { projectReducer } from './features/project';

export const reducer = combineReducers({
  project: projectReducer,
});

// const store = configureStore({
//   reducer,
// });

export type RootState = ReturnType<typeof reducer>;
// export default store;

export const getStore = (state?: RootState) => configureStore({
  reducer,
  preloadedState: state,
});
