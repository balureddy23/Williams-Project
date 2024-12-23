/* eslint-disable*/
const express = require('express');
const path = require("path");
const server = express();
const {createSSRApp} = require('vue');
const {renderToString} = require("@vue/server-renderer");
const manifest = require('./dist/manifest.json');
const appPath = path.join(__dirname, './dist', manifest['app.js']) ;

const SSRApp = require(appPath).default;
server.get('*', async (req, res) => {
    const app = createSSRApp(SSRApp);
    const appContent = await renderToString(app);
    const html = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        </head>
        <body>
        ${appContent}
        </body>
    </html>
    `;
    return res.end(html);
});
server.listen(8081);
