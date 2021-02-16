import { configureStore } from '@reduxjs/toolkit';
import { exampleReducer } from './features/example';

const reducer = {
  example: exampleReducer,
};

export default configureStore({
  reducer,
});

export const getStore = (state: ExampleState) => configureStore({
  reducer,
  preloadedState: state,
});
