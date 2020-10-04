# tweetcrunch
A node.js App built with Express and React and integrated with Typescript

### Steps to run the project in production:

In root folder of project, open a terminal shell and type:

```sh
$ npm run build
```

this will build both the backend and frontend for production, automatically transpile all Typescript server files and make an optimised production build of the Create React App starter and move it to the top level build for production 

Next, to run the project, in same shell type

```sh
$ npm start
```

This will install any dependencies and make our project available on `http://localhost:3001/`

## Happy Twitter Crunching!

Please note:

- if you are running on `Windows OS` the build will not work as it is scripted in `bash` that works for `Linux / MacOs` operating machines. Just skip above steps and start project in `dev environment` following instructions below

### If you want to start the project in dev environment

In root folder type

```sh
$ npm run start-dev
```

this will open the server running the API endpoints on `http://localhost:3001/`

Next, navigate to the React public folder ./twitter-crunch and type

```sh
$ npm run start
```

to start the CRA in development mode. This will open a new window in `http://localhost:3000/` that servers our view. 


[Link to project on GitHub](https://twitter.com/COERCITON)