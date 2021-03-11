import React from 'react';
import { useReducer } from "react";

export interface ProjectState {
  currentFile: File['_id'] | null;
}

const initialState = {
  currentFile: null,
}

const FILE_CHANGE = 'FileChange';

interface FileChangeAction {
  type: typeof FILE_CHANGE;
  payload: File['_id'];
}

export const fileChange = (id: string) => ({
  type: FILE_CHANGE,
  payload: id,
});

type ProjectAction = FileChangeAction;

const projectReducer = (state: ProjectState, action: ProjectAction) => {
  switch (action.type) {
    case FILE_CHANGE:
      return { ...state,  currentFile: action.payload};
    default:
      return state;
  }
}

export default function useProjectReducer() {
  return useReducer(projectReducer, initialState);
}