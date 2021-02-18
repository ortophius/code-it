import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import exampleStore from 'store';
import { Provider } from 'react-redux';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import theme from 'mui/theme';
import App from 'components/App';
import { CssBaseline } from '@material-ui/core';

const SERVER_PORT = 8081; // Port for Express to listen

const app = express();

app.use(express.static(__dirname));

app.get('*', (req, res) => {
  const sheets = new ServerStyleSheets();

  /**
   * At first we render react components into a plain string of HTML code.
   * It executes constructor and `render()` method of every component involved in app.
   */
  const inlineApp = renderToString(
    sheets.collect(
      <Provider store={exampleStore}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>,
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
        window.STATE = ${JSON.stringify(exampleStore.getState())};
        </script>
        <script src="app.js"></script>
      </body>
    </html>
    `;

  // const scriptTag = `
  //   <script>
  //     window.STATE = ${JSON.stringify(exampleStore.getState())};
  //   </script>
  //   <script src="app.js"></script>
  // `;
  // const renderedHTML = template
  //   .replace('<div id="root"></div>', `<div id="root">${inlineApp}</div>`)
  //   .replace('</body>', `${scriptTag}</body>`);

  res.send(renderedHTML);
});

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening at http://localhost:${SERVER_PORT}`);
});
