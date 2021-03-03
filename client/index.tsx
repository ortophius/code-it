import React from 'react';
import { hydrate } from 'react-dom';
import App from 'components/App';
import { Provider } from 'react-redux';
import { getStore } from 'store';
import theme from 'mui/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import AsyncContext, { AsyncContextValue } from 'components/AsyncContext';

/**
 * First, we'll obtain STATE object passed from server.
 */
interface WindowWithState {
  STATE?: RootState;
  ASYNCCONTEXT?: AsyncContextValue;
}

declare let window: WindowWithState;

const state = window.STATE!;
const asyncContextValue = window.ASYNCCONTEXT!;

delete window.STATE;
delete window.ASYNCCONTEXT;

/**
 * Now we need to create a new store based on derived state
 */
const store = getStore(state!);

delete window.STATE;

const JSX = (
  <AsyncContext.Provider value={asyncContextValue}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline>
            <App />
          </CssBaseline>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </AsyncContext.Provider>
);

/**
 * `ReactDOM.hydrate()` method works like `ReactDOM.render()`
 * except it uses already rendendered elements to add its listeners for them.
 * In a nutshell, you can think about it like it it is a `ReactDOM.render()`
 * in SSR applicatons.
 */
hydrate(
  JSX,
  document.getElementById('root'),
);
