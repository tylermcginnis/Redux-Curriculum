<img src="http://www.reactjsprogram.com/images/reactjsprogram-500.png" width="250" align="right">

React.js Program's "Redux + Immutable" Curriculum
========

####For more information on React.js Program, [click here](http://reactjsprogram.com)

##Objective
Build a functioning "Would you Rather" application using React.js, Redux, Firebase, and Immutable.js. The end result of this project can be found [HERE](http://www.reactjsprogram.com/Redux-Immutable-Curriculum).

## Notes
The goal here is to give you just enough guidance for you to struggle without drowning. Note that the steps below are just suggestions. The ideal situation is you look at the completed project, then you build it. However, if you're not up for such things, feel free to follow the (vague by design) steps below. If you get stuck, all steps have coinciding branches for you to reference as a last case scenario.

##Step 0: Examine the Final Product
 * Head over [HERE](http://www.reactjsprogram.com/Redux-Immutable-Curriculum) and play around with the final project. Think about how you would separate your different components and functionality.

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

##Step 3: Basic Routing
Now that our webpack config is set up properly and we have our HelloWorld app, let's go ahead and tie in some basic routing with React Router.

 * We're going to use React Router to handle our routing, run `npm install --save react-router` in your project.
 * Inside of your `app` folder, create a `containers` folder.
 * Inside that folder create an `index.js` file, a `Main` folder, and a `Home` folder.
 * Inside your `Main` folder create a `MainContainer.js` file and inside your `Home` folder create a `HomeContainer.js` file.
 * Now, we're going to use our `index.js` file we made to make our imports easier just like we did in the video. Head over to your `index.js` file and add the proper exports (or MainContainer.js and HomeContainer.js)
 * Now inside of both `HomeContainer.js` and `MainContainer.js` create a React component which just renders a string or 'Home' or 'Main'.
 * Now let's set up some basic routing. Inside your `app` folder create a `config` folder and inside of that create a `routes.js` file.
 * Inside that routes file create declarative Routes which will render `MainContainer` as the main parent route (/) and `HomeContainer` as the `IndexRoute`.
 * Now our initial routes are set up, we need to render those when we call ReactDOM.render. Header over to your `app/index.js` file and instead of rendering `Main`, render your Routes.
 * If you refresh your view you should now see 'Main'. Great! But we should also be seeing 'Home' as well. The reason we're not is because we're not rendering any children components inside of Main. Remember, MainContainer is our main parent route. When we transition to different URLs, different children routes are going to becoming active. We need to render those children routes. Head over to `MainContainer.js` and instead of just rendering 'Main', we want to render 'Main' as well as any children routes that are passed to it (`this.props.children`). Make those changes now.
 * Reload your app and now you should see both Main and Home since our HomeContainer component is our IndexRoute (which becomes active when no other routes 'path' match the URL, in this case we have no other routes, so HomeContainer is always active).

##Step 4: Main and Home Styling
If you checkout the [final solution](http://www.reactjsprogram.com/Redux-Immutable-Curriculum), you'll notice the basic home page. Our routing is set up so now let's just style the HomeContainer and MainContainer components

 * Create a `components` folder in your `app` folder
 * Create a `Home` folder in your components folder and create a `Home.js` file inside that `Home` folder
 * Format and Style your Home component
 * Add styling/format to your Home component
 * Create an `index.js` file inside your components folder and export Home.js for easier imports
 * Now in your `HomeContainer` you need to render your `Home` component rather than the text 'Home'
 * Right now your App should look like this

<img src="http://www.reactjsprogram.com/images/redux-step4.png" width="400">

##Step 5: Navigation Skeleton
Our navigation bar is going to be fundamental to our application. Even though all the pieces that it entails won't be set up, in this section you'll go ahead and set up the navigation assuming you'll tie in the rest of the pieces later.

 * In your components folder create a Navigation component which takes in an `isAuthed` property.
 * Looking at the finished example you'll notice that the navbar changes based on if you're logged in or not. On the left side if you're logged in you'll see a 'Home' link and if you're not you'll see Home and Authenticate. On the right if you're logged in you'll see a button to create a new question as well as a logout button.
 * Using React Router's `Link` component, create your Navigation component using the following paths as your Links, `/` for home, `/logout`, and `/auth`. Even though these routes aren't created yet, we'll do that later.
 * Instead of having a Button that pops open a Modal, for now just write 'Modal'
 * Style your navigation component appropriately.
 * Inside of MainContainer import your newly created Navigation component and render it initially passing in `false` for `isAuthed` (test if it works) then pass in `true` and test that your UI is changing based on the `isAuthed` prop.