<h1 align="center" width="70%"><a href="http://shrouded-sands-46900.herokuapp.com/"><img src="https://i.imgur.com/gfcW2mB.png"/></a></h1>
<h3 align="center">Knowledge center - social bookmarking website for developers, programmers or hobbyists.<br> <b>LIVE:</b> http://shrouded-sands-46900.herokuapp.com</h3>
<br/>

## Introduction
RefShare is an open source fullstack web application created for everyone who values order and harmony in their resources and for those who want to increase personal growth by looking for new content as guides, tutorials, articles or docs. RefShare is a perfect place for those who want to share their resources with others, while at the same time looking for new inspirations and want to extend the horizons of their competences.<br/>
If you have no idea where to get knowledge from, would to ask experienced programmers for their opinions or would to share your selected links with others? Be free to create an account and be part of the best social web bookmarking network.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Before installing, [download and install Node.js](https://nodejs.org/en/download/). It is required to have both, Node.js and NPM installed on your local machine.
To verify it's installed correctly use command:
```bash
$ node -v && npm -v
```

### Installing

First of all clone repo or download source code from [master branch](https://github.com/selthias/refshare/). 

Then, open your favourite terminal, go to RefShare root folder and use 
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):
```bash
$ npm install
```
That will install every dependencies listed in `package.json` file required to run local server.
Then, go to `/client` folder and install all dependencies for client.
```bash
$ cd client && npm install
```
After those installation your source code is almost ready to run.
Last thing to do is configure a database connection. RefShare is using Moongose to create Schemas, so you have to deliver MongoDB connection. For this purpose create a new file in `/config` folder named `keys_dev.js`.
This file has to be created in following structure:
```javascript
module.exports = {
  mongoURI: 'YOUR_MONGO_URI',
  secretOrKey: 'YOUR_SECRET_PHRASE'
};
```

### Starting an application (developing mode)

After all setups you can now locally start your platform. Because RefShare is a MERN aplication, all used commands are `npm scriptes` so it is listed in `package.json` file and should be run in this file location.

- To start whole application (backend + frontend) use a command which will start server and client [concurrently](https://www.npmjs.com/package/concurrently)
```bash
$ npm run dev
```

- To start only server-side of application
```bash
$ npm start
```

- To start only server-side of application with [nodemon](https://github.com/remy/nodemon) wrapper, which will automatically restarting an application whenever you change a code. 
```bash
$ npm run server
```

After starting server you should see a following message on your console:
```bash
Server running on port 5000
Mongo DB Connected
```
That means server is started on port 5000 and is connected to given database.<br/>
At this point you can test your server with any API REST client, like [Postman](https://www.getpostman.com/) or [cURL](https://curl.haxx.se/).

Use `/api/test` URI to create simple request to test server connection  
```bash
$ curl -X GET localhost:5000/api/test
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    28  100    28    0     0   1750      0 --:--:-- --:--:-- --:--:--  1750{"msg":"Server is running!"}
```

- If for any reason you want to run only client-side of application use
```bash
$ npm run client
```

## Deployment (Heroku)

RefShare has support in deploying application to [Heroku](https://www.heroku.com/) which is a cloud platform as a service (PaaS) supporting several programming languages.</br>
Create you own account, install [Heroku-CLI](https://devcenter.heroku.com/articles/heroku-cli) and run `heroku app` in CLI, next provide enviroment `Config Vars` in Heroku website, including MongoDB URI and secret phrase.<br/><br/>
In `package.json` file there is a script `"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"`, which is used by Heroku. With this script Heroku automatically builds client application in way we want to. `NPM_CONFIG_PRODUCTION=false` flag is to tell Heroku to download all dev-dependencies for client app.

## Used technologies

### Backend

* [Node.js](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine
* [ExpressJS](https://expressjs.com/) - Node.js web application framework
* [Mongoose ODM](https://mongoosejs.com/) - Object modeling for node.js
* [nodemon](https://www.npmjs.com/package/nodemon) - Automatically restarting the node application when file changes 
* [Passport.js](http://www.passportjs.org/) - Authentication middleware for Node.js
* [passport-jwt](https://www.npmjs.com/package/passport-jwt) - Strategy for authenticating with a JSON Web Token
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - An implementation of JSON Web Tokens
* [body-parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware
* [bcrypt.js](https://www.npmjs.com/package/bcryptjs) - Optimized bcrypt in JavaScript
* [validator.js](https://www.npmjs.com/package/validator) - A library of string validators and sanitizers


### Frontend

* [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Redux + React-Redux](https://redux.js.org/basics/usagewithreact) - State container for JavaScript apps
* [Create-React-App](https://reactjs.org/docs/create-a-new-react-app.html) - best way to start building a new single-page application in React
* [React Router](https://github.com/ReactTraining/react-router) - Declarative routing for React
* [Redux-thunk](https://github.com/reduxjs/redux-thunk) - Redux middleware to write action creators that return a function instead of an action
* [Redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) - provides power-ups for your Redux development workflow
* [React-devtools](https://github.com/facebook/react-devtools) - lets to inspect the React component hierarchy, including component props and state
* [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
* [Material UI](https://material-ui.com/) - React components that implement Google's Material Design
* [react-facebook-login](https://www.npmjs.com/package/react-facebook-login) - A Facebook OAuth Sign-in / Log-in Component for React
* [react-google-login](https://www.npmjs.com/package/react-google-login) - A Google OAuth Sign-in / Log-in Component for React
* [jwt-decode](https://www.npmjs.com/package/jwt-decode) - Library that helps decoding JWTs token which are Base64Url encoded
* [classnames](https://www.npmjs.com/package/classnames) - A simple JavaScript utility for conditionally joining classNames together
* [react-copy-to-clipboard](https://www.npmjs.com/package/react-copy-to-clipboard) - Copy to clipboard React component


## Used practics

* As mentioned before, client-side was create using [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) package. This means that a lot of boilerplate was created by script. In this way there is no need to configure things e.g. bundlers like Webpack or Babel loaders, plugins and module rules. To make possible for local client side to communicate with local backend is to use a `proxy`, in `package.json` file add `proxy": "http://localhost:5000/`, this tells Webpack development server to proxy API requests to API server, given that Express server is running on `localhost:5000`.

* Authenticate is based on JSON Web Tokens. After successful autorization (using standard username/password method or 3rd party services like Facebook or Google), server sign a new JWT for user. For safety reasons every JWT expires in one hour. Algoritm takes user data like his ID, name and picture and then generate a new JWT using secret phrase. New JSON Web Token is returned to a user as [Bearer type token](https://jwt.io/introduction/), store in his agent local storage and pass in every HTTP request made with axios in Autorization Header. To debug JWT use online [debugger](https://jwt.io/).

* For better understanding of application flow it is recommended to use brower extensions like [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [React DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en). `store.js` is adapted to work with these extensions by using special function `composeWithDevTools` which is invoked at the time of creating Redux's store object.

## Author

* **Krystian Walaszczyk** [Selthias](https://github.com/Selthias)

## License

This project is licensed under the MIT License
