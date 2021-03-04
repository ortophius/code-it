import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { getStore } from 'store';
import { Provider } from 'react-redux';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import theme from 'mui/theme';
import App from 'components/App';
import { CssBaseline } from '@material-ui/core';
import mongoose from 'mongoose';
import { StaticRouter } from 'react-router-dom';
import AsyncContext from 'components/AsyncContext';
import applyRoutes from './rest';

mongoose.connect('mongodb://localhost/codeit', { useNewUrlParser: true, useUnifiedTopology: true });

const SERVER_PORT = 8081; // Port for Express to listen

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

applyRoutes(app);

app.get('(/**)?/favicon.ico', (r, res) => {
  res.status(404);
  res.statusMessage = 'Not found';
  res.send();
});

app.get('*', async (req, res) => {
  const store = getStore();
  const sheets = new ServerStyleSheets();

  const asyncContextValue = {
    promises: [],
    values: {},
  };

  /**
   * At first we render react components into a plain string of HTML code.
   * It executes constructor and `render()` method of every component involved in app.
   */

  renderToString(
    sheets.collect(
      <AsyncContext.Provider value={asyncContextValue}>
        <StaticRouter location={req.path}>
          <Provider store={store}>
            <App />
          </Provider>
        </StaticRouter>
      </AsyncContext.Provider>,
    ),
  );

  await Promise.all(asyncContextValue.promises);

  const inlineApp = renderToString(
    sheets.collect(
      <AsyncContext.Provider value={asyncContextValue}>
        <StaticRouter location={req.path}>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </Provider>
        </StaticRouter>
      </AsyncContext.Provider>,
    ),
  );

  const css = sheets.toString();
  /**
   * Next we need to inject rendered HTML into our template.
   * We can do this in many different ways, like using DOMParser
   * or even generate the whole page.
   * Here I used `str.replace()` method.
   */

  const renderedHTML = `
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style id="jss">${css}</style>
        <title>Repl.it</title>
      </head>
      <body>
        <div id="root">${inlineApp}</div>
        <script>
        window.STATE = ${JSON.stringify(store.getState())};
        window.ASYNCCONTEXT = ${JSON.stringify(asyncContextValue)};
        </script>
        <script src="/app.js"></script>
      </body>
    </html>
    `;

  res.status(200);
  res.statusMessage = 'Found';
  res.send(renderedHTML);
});

app.listen(SERVER_PORT, () => {
  console.log(`Listening at http://localhost:${SERVER_PORT}`);
});
