import React, { useCallback, useContext } from 'react';
import InsertDriveFileSharpIcon from '@material-ui/icons/InsertDriveFileSharp';
import TreeItem from './TreeItem';
import { TreeContext, changeFile, changeDirectory } from './Store';

interface FileProps {
  file: File
}

function FileItem({ file }: FileProps) {
  const { dispatch, onFileClick } = useContext(TreeContext);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onFileClick(file._id);
    dispatch(changeFile(file._id));
    if (typeof file.parent === 'string') dispatch(changeDirectory(file.parent));
    else dispatch(changeDirectory(file.parent._id));
  }


  return (
    <TreeItem text={file.title} icon={<InsertDriveFileSharpIcon />} onClick={handleClick} />
  );
}

export default FileItem;
