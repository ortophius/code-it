import React from 'react';
import { useReducer } from "react";

export type TreeState = {
  currentFile: string | null;
  currentDirectory: string | null;
}

const FILE_CHANGE = 'FileChange';
const DIRECTORY_CHANGE = 'Test';

interface ChangeFileAction {
  type: typeof FILE_CHANGE;
  payload: File['_id']
}

interface ChangeDirAction {
  type: typeof DIRECTORY_CHANGE;
  payload: Folder['_id']
}

export type TreeAction = ChangeFileAction | ChangeDirAction;

export const changeFile = (id: string): ChangeFileAction => ({
  type: FILE_CHANGE,
  payload: id,
});

export const changeDirectory = (id: string): ChangeDirAction => ({
  type: DIRECTORY_CHANGE,
  payload: id,
});

const initialState: TreeState = { currentFile: null, currentDirectory: null };

const treeReducer = (state: TreeState, action: TreeAction) => {
  switch(action.type){
    case FILE_CHANGE:
      return { ...state, currentFile: action.payload };
    case DIRECTORY_CHANGE:
      return { ...state, currentDirectory: action.payload };
    default:
      return state;
  }
}

type ContextState = {
  dispatch: React.Dispatch<TreeAction> | (() => void),
  state: TreeState,
}

const useTreeStore = () => useReducer(treeReducer, initialState)

export const TreeContext = React.createContext<ContextState>({ 
  dispatch: () => {},
  state: initialState,
})

export default useTreeStore;