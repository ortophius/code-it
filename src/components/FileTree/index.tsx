import { List } from '@material-ui/core';
import React, { useEffect, useReducer } from 'react';
import FolderItem from './FolderItem';
import useTreeStore, { TreeContext } from './Store';

type FileTreeProps = {
  rootFolder: Folder;
  onFileClick?: (id: string) => void;
}

function FileTree({ rootFolder, onFileClick }: FileTreeProps) {

  const [localState, localDispatch] = useTreeStore();

  useEffect(() => {
    if (!localState.currentFile) return;
    if (onFileClick)  onFileClick(localState.currentFile);
  }, [localState.currentFile]);

  return (
      <TreeContext.Provider value={{dispatch: localDispatch}}>
        <List>
          <FolderItem folder={rootFolder} root />
        </List>
      </TreeContext.Provider>
  );
}

export default FileTree;
