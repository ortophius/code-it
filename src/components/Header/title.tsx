import React, { useEffect, useRef, useState } from 'react';
import {
  ClickAwayListener, makeStyles, InputBase, Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { changeTitle, selectProject, selectProjectTitle } from 'store/features/project';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    color: 'inherit',
  },
  input: {
    color: 'inherit',
    textAlign: 'center',
  },
});

export default function Title() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const project = useSelector(selectProject);
  const projectTitle = project.title;
  const [edit, setEdit] = useState(false);

  const textField = useRef<HTMLInputElement>();

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleTitleChange = async () => {
    if (!(textField && textField.current)) return;

    const newTitle = textField.current.value;

    setEdit(false);
    if (!newTitle || Object.is(projectTitle, newTitle)) return;

    const changes = { title: newTitle };
    const res = await axios.post(`/v1/project/${project.link}/attributes`, changes);

    if (res.status === 200) dispatch(changeTitle(newTitle));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') handleTitleChange();
  };

  const content = (edit)
    ? (
      <ClickAwayListener onClickAway={handleTitleChange}>
        <InputBase
          inputRef={textField}
          classes={{ root: classes.root }}
          defaultValue={projectTitle}
          onKeyPress={handleKeyPress}
          inputProps={{ className: classes.input }}
        />
      </ClickAwayListener>
    )
    : (<Typography onClick={toggleEdit}>{ projectTitle }</Typography>);

  useEffect(() => {
    if (!(textField && textField.current)) return;
    textField.current.focus();
  }, [edit]);

  return content;
}
