import { ListItemIcon, makeStyles, Theme } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { ReactNode } from 'react';

const useStyles = makeStyles((theme: Theme) => (
  {
    icon: {
      minWidth: theme.spacing(5),
    },
  }
));

interface TreeItemProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  icon?: ReactNode;
}

const TreeItem = ({ text, icon = null, onClick = () => {} }: TreeItemProps) => {
  const classes = useStyles();

  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon classes={{ root: classes.icon }}>
        { icon }
      </ListItemIcon>
      <ListItemText>
        { text }
      </ListItemText>
    </ListItem>
  );
};

export default TreeItem;
