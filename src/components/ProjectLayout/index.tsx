import { Grid } from '@material-ui/core';
import axios from 'axios';
import FileTree from 'components/FileTree';
import useSSE from 'helpers/useSSE';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { notFound, selectProject, updateProjectInfo } from 'store/features/project';

// gqpiag7bmt

export default function Project() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const project = useSelector(selectProject);
  async function fetchProjectInfo() {
    const url = (typeof window !== 'undefined') ? `/v1/project/${id}` : `http://localhost:8081/v1/project/${id}`;
    try {
      const res = await axios.get<ProjectState>(url);

      if (res.status !== 200) return;
      dispatch(updateProjectInfo(res.data));
    } catch {
      dispatch(notFound());
    }
  }

  // To-do: run startup() only if id changed after first render
  useEffect(() => {
    if (id === project.link) return;
    fetchProjectInfo();
  }, [id]);

  useSSE('project', fetchProjectInfo);

  const fileClickHandler = (fileId: string) => { console.log(fileId); };

  return (
    <Grid container item spacing={2} xs={12}>
      <Grid item xs={2}>
        { (project.root)
          ? <FileTree rootFolder={project.root!} onFileClick={fileClickHandler} /> : null }
      </Grid>
      <Grid item xs={4}>
        Кодъ))0
      </Grid>
      <Grid item xs={6}>
        Дебуг))) лол
      </Grid>
    </Grid>
  );
}
