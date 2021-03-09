import React, { useCallback, useContext, useState } from 'react';
import { FolderSharp } from '@material-ui/icons';
import {
  Collapse, List, makeStyles, Theme,
} from '@material-ui/core';
import TreeItem from './TreeItem';
import FileItem from './FileItem';
import { changeDirectory, TreeContext } from './Store';

const useStyles = makeStyles((theme: Theme) => ({
  nestedList: {
    paddingLeft: theme.spacing(1),
  },
}));

type FolderItemProps = {
  folder: Folder;
  root?: boolean;
  onFileClick?: (fileId: string) => void;
};

function FolderItem({ folder, root }: FolderItemProps) {
  const { dispatch } = useContext(TreeContext);
  const { children, files } = folder;
  const [open, setOpen] = useState(root);
  const classes = useStyles();

  const clickHandler = () => {
    setOpen((openValue) => !openValue);
    dispatch(changeDirectory(folder._id));
  }

  const childFoldersList = children.map(
    (child) => (
      <FolderItem
        key={child.title}
        folder={child}
      />
    ),
  );

  const fileList = files.map(
    (file) => (
      <FileItem 
        key={file.title}
        file={file}
      />
    ),
  );

  const listItem = (
    <TreeItem
      text={folder.title}
      icon={<FolderSharp />}
      onClick={clickHandler}
    />
  );

  return (
    <>
      { !root && listItem }
      <Collapse in={open} timeout="auto">
        <List className={classes.nestedList}>
          { childFoldersList }
          { fileList }
        </List>
      </Collapse>
    </>
  );
}

export default FolderItem;
