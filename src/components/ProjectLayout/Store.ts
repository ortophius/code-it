import { TabClassKey } from '@material-ui/core';
import React from 'react';
import { useReducer } from "react";

type Tab =  Pick<File, '_id' | 'title' | 'body'>;

export interface ProjectState {
  currentTab: Tab['_id'] | null;
  tabs: Record<Tab['_id'], Tab>;
}

const initialState: ProjectState = {
  currentTab: null,
  tabs: {},
}

const TAB_CHANGE = 'TabChange';
const TAB_CLOSE = 'TabClose';
const TAB_LOAD = 'TabLoad';

interface TabChangeAction {
  type: typeof TAB_CHANGE | typeof TAB_CLOSE;
  payload: Tab['_id'];
}

interface TabLoadAction {
  type: typeof TAB_LOAD;
  payload: Tab;
}

// interface FileChangeAction {
//   type: typeof FILE_CHANGE;
//   payload: File['_id'];
// }

// interface DirectoryChangeAction {
//   type: typeof DIR_CHANGE;
//   payload: Folder['_id'];
// }

// export const fileChange = (id: string): FileChangeAction => ({
//   type: FILE_CHANGE,
//   payload: id,
// });

// export const directoryChange = (id: string): DirectoryChangeAction => ({
//   type: DIR_CHANGE,
//   payload: id,
// })

export const tabChange = (_id: string): TabChangeAction  => ({
  type: TAB_CHANGE,
  payload: _id
})

export const tabClose = (_id: string): TabChangeAction => ({
  type: TAB_CLOSE,
  payload: _id,
});

export const tabLoad = (_id: string, title: string, body: string): TabLoadAction => ({
  type: TAB_LOAD,
  payload: {
    _id,
    title,
    body,
  }
})

type ProjectAction = TabChangeAction | TabLoadAction;

const createTab = (_id: string, title: string, body: string = ''): Tab => ({
  _id,
  title,
  body
})

const projectReducer = (state: ProjectState, action: ProjectAction): ProjectState => {
  switch (action.type) {
    case TAB_CHANGE:
      const _id = action.payload;
      if (!state.tabs[_id]) {
        const tab = createTab(_id, 'Loading...')
        state.tabs[_id] = tab;
      }

      const currentTab = _id;
      return { ...state, currentTab };

    case TAB_LOAD:
      if (!state.tabs[action.payload._id]) return state;
      const { title, body } = action.payload;
      const tab = state.tabs[action.payload._id];
      const loadedTab = createTab(tab._id, title, body);
      return { 
        ...state,
        tabs:{
          ...state.tabs,
          [action.payload._id]: loadedTab,
        },
       }

      case TAB_CLOSE:
        const newState = { ...state };
        delete newState.tabs[action.payload];
       if (newState.currentTab === action.payload) {
         const lastTabId = Object.keys(newState.tabs).slice(-1)[0]
         newState.currentTab = lastTabId || null;
       }
        return newState;
    default:
      return state;
  }
}

export default function useProjectReducer() {
  return useReducer(projectReducer, initialState);
}