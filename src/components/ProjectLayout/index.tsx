import { Grid } from '@material-ui/core';
import axios from 'axios';
import Edtitor from 'components/Editor';
import FileTree from 'components/FileTree';
import useTreeStore from 'components/FileTree/Store';
import useSSE from 'helpers/useSSE';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { notFound, selectProject, updateProjectInfo } from 'store/features/project';
import useProjectReducer, { tabChange, tabClose, tabLoad } from './Store';

// gqpiag7bmt

export default function Project() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const project = useSelector(selectProject);
  const [projectState, localDispatch] = useProjectReducer();
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

  useEffect(() => {
    if (id === project.link) return;
    fetchProjectInfo();
  }, [id]);

  useSSE('project', fetchProjectInfo);

  const fileClickHandler = (fileId: string) => {
    if (!projectState.tabs[fileId]) {
      axios.get(`/v1/node/file/${fileId}`).then((res) => {
        if (res.status !== 200)  return;
        const file: File = res.data as File;
        localDispatch(tabLoad(file._id, file.title, file.body));
      })
    }
    localDispatch(tabChange(fileId));
  };

  const handleTabChange = (id: string) => {
    localDispatch(tabChange(id));
  }

  const handleTabClose = (id: string) => {
    localDispatch(tabClose(id));
  }

  return (
    <Grid container item spacing={2} xs={12}>
      <Grid item xs={2}>
        { (project.root)
          ? <FileTree rootFolder={project.root!} onFileClick={fileClickHandler} /> : null }
      </Grid>
      <Grid item xs={4}>
        <Edtitor
          tabs={projectState.tabs}
          activeTabId={projectState.currentTab}
          onTabChange={handleTabChange}
          onTabClose={handleTabClose}/>
      </Grid>
      <Grid item xs={6}>
        Дебуг))) лол
      </Grid>
    </Grid>
  );
}
