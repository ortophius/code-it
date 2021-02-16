import express from 'express';
import template from 'index.html';
import React from 'react';
import { renderToString } from 'react-dom/server';
import exampleStore from 'store';
import { Provider } from 'react-redux';
import App from 'components/App/App';

const SERVER_PORT = 8081; // Port for Express to listen

const app = express();

app.use(express.static(__dirname));

app.get('*', (req, res) => {
  /**
   * At first we render react components into a plain string of HTML code.
   * It executes constructor and `render()` method of every component involved in app.
   */
  const inlineApp = renderToString(
    <Provider store={exampleStore}>
      <App />
    </Provider>,
  );

  /**
   * Next we need to inject rendered HTML into our template.
   * We can do this in many different ways, like using DOMParser
   * or even generate the whole page.
   * Here I used `str.replace()` method.
   */
  const scriptTag = `
    <script>
      window.STATE = ${JSON.stringify(exampleStore.getState())};
    </script>
    <script src="app.js"></script>
  `;
  const renderedHTML = template
    .replace('<div id="root"></div>', `<div id="root">${inlineApp}</div>`)
    .replace('</body>', `${scriptTag}</body>`);

  res.send(renderedHTML);
});

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening at http://localhost:${SERVER_PORT}`);
});
