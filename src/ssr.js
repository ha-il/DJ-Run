import { App } from "./components.js";

export const generateHTML = (path, model) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>DJ.Run</title>
    </head>
    <body>
      <div id="app">
        ${App(path, model)}
      </div>    
    </body>
  </html>
`;
