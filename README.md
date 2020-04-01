# CLIENT DOCS

## Quick Start
#### First make sure you have [Yarn](https://yarnpkg.com/en/docs/install) install 
 This app uses [create-react-app](https://github.com/microsoft/TypeScript-React-Starter) with typescript flag
```sh
yarn
# this install all the front-end dependencies
yarn start
# this will start the server at PORT 3000
```
## Folder Structure
```
client
├── README.md
├── node_modules
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```
## Application Structure
Every request need's to get forwarded to a "Route Handler" which are all the files in route folder from where it get it's appropriate controller which later on get resolved to a rawQueries or a model or both to send back response.

## Key Points
* To run database locally make sure to restore it's schema with vg-schema-backup.sql which is at root folder
* Make sure to not use params/dynamic routes as it's not possible to catch those routes in userAuthRoutes.ts use header or query instead.
* Make sure you follow application structure/convention for consistency 
