import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { AppBar, Tabs } from '@material-ui/core';
import MaterialTab from '@material-ui/core/Tab';
import EditorTab from 'components/EditorTab';

type Tab = Pick<File, '_id' | 'title' | 'body'>;

interface EditorProps {
  tabs?: Record<Tab['_id'], Tab>;
  activeTabId?: Tab['_id'] | null;
  onTabChange?: (id: string) => void;
  onTabClose?: (id: string) => void;
}

export default function Edtitor({ tabs = {}, activeTabId = null, onTabChange = () => {}, onTabClose = () => {} }: EditorProps) {

  const renderTabs = (): JSX.Element[] | null => {
    const res: JSX.Element[] = [];

    for (let id in tabs) {
      const { _id, title } = tabs[id];

      res.push(<EditorTab
        key={_id}
        value={_id}
        title={title}
        onClose={onTabClose}
        onClick={() => { onTabChange(_id) }}
      />)
    }

    return (res.length) ? res : null;
  }

  return (
    <>
        <Tabs value={activeTabId}>
          { renderTabs() }
        </Tabs>
    </>
  )
}