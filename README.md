<img src="http://www.reactjsprogram.com/images/reactjsprogram-500.png" width="250" align="right">

React.js Program's "Redux + Immutable" Curriculum
========

####For more information on React.js Program, [click here](http://reactjsprogram.com)

##Objective
Build a functioning "Would you Rather" application using React.js, Redux, Firebase, and Immutable.js. The end result of this project can be found [HERE](http://www.reactjsprogram.com/Redux-Immutable-Project).

## Notes
The goal here is to give you just enough guidance for you to struggle without drowning. Note that the steps below are just suggestions. The ideal situation is you look at the completed project, then you build it. However, if you're not up for such things, feel free to follow the (vague by design) steps below. If you get stuck, all steps have coinciding branches for you to reference as a last case scenario.

##Step 0: Examine the Final Product
 * Head over [HERE](http://www.reactjsprogram.com/Redux-Immutable-Project) and play around with the final project. Think about how you would separate your different components and functionality.

##Step 1: Set up a HelloWorld Component
Before I ever start a React app, no matter how complex, I always create a HelloWorld component just to make sure that I've tied everything together properly. I don't expect you to have all this memorized, but do your best to wire up everything by yourself. If you do get stuck you can refer to the 'step1' branch.

 * Create a new project or fork this repository
 * npm install the dependencies you'll need (for a basic HelloWorld app). Include ES6+.

  ```npm install --save react react-dom```
  ```npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0 css-loader html-webpack-plugin style-loader webpack webpack-dev-server```

 * Create and configure your .babelrc file
 * Create and configure your webpack.config.js file
 * Create an app directory and in your app directory create and configure your index.html file
 * In your app directory create and configure your index.js file to render a HelloWorld component
 * Start webpack and make sure everything is working
 * Add a `production` command to your scripts property in package.json which runs `webpack -p`
 * Add a `start` command to your scripts property in package.json which runs `webpack-dev-server`
 * Run `npm run start` from your terminal then check `localhost:8080` to make sure everything is rendering correctly

##Step 2: Improve Webpack
If you followed my example above, our webpack configurations are super minimal. Let's go ahead and beef them up a bit by adding CSS Module source maps, path file resolving, source maps, Hot Module Replacement, and a production build.

 * We're going to need babel-preset-react-hmre, so npm install that as a dev dependency.
 * In order for us to use ES+ features in our webpack.config.js file we need to change the name to webpack.config.babel.js. Do that now.
 * As we did in the videos, we're going to create a different configuration object for both production and development then merge them together based on if we're in production mode or not. First, utilize `process.env.npm_lifecycle_event` to create a variable to know if we're in 'production' mode or not. Remember, `process.env.npm_lifecycle_event` will tell us what command was ran in order to start our server. If we run `npm run production`, then `process.env.npm_lifecycle_event` will be production.
 * Let your .babelrc file know if you're in production by utilizing process.env.BABEL_ENV.
 * If the previous step is done correctly you can now set up different presets in your .babelrc file based on which mode we're running in. Head over to your .babelrc file and make it so when we're in development mode (or we ran `npm run start` to start our server), then we set the "react-hmre" preset. Don't worry if you don't have all of this memorized, you shouldn't, if you do copy/paste a lot of this configuration code, just make sure you know what's going on.
 * Back in your webpack.config.babel.js file create a productionPlugin variable which uses Webpack's DefinePlugin property to set `process.env.NODE_ENV` to production. This is critical to have fast performing code in production.
 * Create three variables, `base`, `developmentConfig`, and `productionConfig`. Base has all of the config properties that are shared with with `developmentConfig` and `productionConfig`, and the others have that config settings based on the specific build we're running (prod vs development).
 * Now, we need to export an object that combines our base variable with either `developmentConfig` or `productionConfig`. Use Object.assign to do this.
 * Run both `npm run start` and `npm run production` to make sure everything is still working correctly (your app should still just render 'Hello World!'. Remember, `npm run start` just starts a local server which your files will be served from. `npm run start` should create a `/dist` folder.