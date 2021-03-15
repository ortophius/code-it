import { List } from '@material-ui/core';
import React, { useEffect, useReducer } from 'react';
import FolderItem from './FolderItem';
import useTreeStore, { TreeContext } from './Store';

type FileTreeProps = {
  rootFolder: Folder;
  onFileChange?: (id: string) => void;
  onFileClick?: (id: string) => void;
}

function FileTree({ rootFolder, onFileChange = () => {}, onFileClick = () => {} }: FileTreeProps) {

  const [localState, localDispatch] = useTreeStore();

  useEffect(() => {
    if (!localState.currentFile) return;
    if (onFileChange)  onFileChange(localState.currentFile);
  }, [localState.currentFile]);

  return (
      <TreeContext.Provider value={{dispatch: localDispatch, state: localState, onFileClick}}>
        <List>
          <FolderItem folder={rootFolder} root />
        </List>
      </TreeContext.Provider>
  );
}

export default FileTree;
