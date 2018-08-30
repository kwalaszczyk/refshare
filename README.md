<h1 align="center"> <a href="http://shrouded-sands-46900.herokuapp.com/" target="_blank">RefShare </a></h1>
<h3 align="center">Knowledge center - social bookmarking website for developers, programmers or hobbyists.</h3>
<br/>

## Introduction
RefShare is an open source fullstack web application created for everyone who values order and harmony in their resources and for those who want to increase personal growth by looking for new content as guides, tutorials, articles or docs. RefShare is a perfect place for those who want to share their resources with others, while at the same time looking for new inspirations and want to extend the horizons of their competences.<br/>
If you have no idea where to get knowledge from, would to ask experienced programmers for their opionions or would to share your selected links with others? Be free to create an account and be part of the best social web bookmarking network.

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
Create you own account, install [Heroku-CLI](https://devcenter.heroku.com/articles/heroku-cli) and run `heroku app` in CLI, next provide enviorment `Config Vars` in Heroku website, including MongoDB URI and secret phrase.<br/><br/>
In `package.json` file there is a script `"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"`, which is used by Heroku. With this script Heroku automatically builds client application in way we want to. `NPM_CONFIG_PRODUCTION=false` flag is to tell Heroku to download all dev-dependencies for client app.

## Used technologies

### Backend

* [ExpressJS](https://expressjs.com/) - Node.js web application framework

### Frontend

* [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces

## Authors

* **Krystian Walaszczyk** [Selthias](https://github.com/Selthias)

## License

This project is licensed under the MIT License
