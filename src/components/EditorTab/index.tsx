import React, { forwardRef, PropsWithRef, useMemo } from 'react';
import MaterialTab from '@material-ui/core/Tab';
import CloseIcon from '@material-ui/icons/Close';
import { Grid, makeStyles, Typography } from '@material-ui/core';

interface TabProps {
  value: string;
  title?: string;
  onClose?: (id: string) => void;
  onClick?: () => void;
}

const useStyles = makeStyles({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeIcon: {
    cursor: 'pointer',
    transition: 'background-color 0.4s',
    '&:hover': {
      backgroundColor: 'grey',
    },
  },
});

const EditorTab = ({ value, title = '',  onClose = () => {}, onClick = () => {}}: TabProps) => {
  const classes = useStyles();

  const handleClose = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    onClose(value);
  }

  const label = (
    <>
      {title}
      <CloseIcon  className={classes.closeIcon} onClick={handleClose}/>
    </>
  )

  return <MaterialTab
    value={value}
    label={label}
    onClick={onClick}
    classes={{wrapper: classes.wrapper}}
    wrapped
  />
}

export default EditorTab;