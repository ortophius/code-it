import React from 'react';

type Values = Record<string, any>;

export interface AsyncContextValue {
  promises: Promise<any>[];
  values: Values;
}

const asyncContextValue: AsyncContextValue = {
  promises: [],
  values: {},
};

export default React.createContext(asyncContextValue);
