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

##Step 6: Designing your Redux State
Now that we're starting to get into authentication, we're going to start to have state in our application. Before we do that, it's a good idea to have a general idea of what the shape of your application's state is going to look like. This may not be practical in larger applications, but we're going to map out the shape of Firebase, Redux, our Reducers and Actions creators before we continue to work on any future part of the app. If done correctly, this activity will be hugely beneficial when your start to actually build your app.

 * Head back over to the finished app here and really play around with it. Think of all of the different pieces of state that are living and changing in the app.
 * Create a reduxSchema.js file in your root directory
 * Fill out this file to be a representation of what your full state tree will be once everything is tied up. You're not going to actually use this file, but you will refer to it when you're building your reducers and actions creators.
 * Remember if you're struggling, refer to the `step6` branch, just don't use it as a crutch.

##Step 7: Desigining your Firebase Schema
Now we're going to do exactly what we did in Step 6, but instead we're going to do it for Firebase. Reflect on the difference we talked about between a Firebase schema and a Redux Schema.

 * Create a firebaseSchema.js file and add a representation of what your Firebase schema will look like. Again this will just be for reference only. Don't be afraid to screw it up the first time. It usually takes a few attempts to get it right.

## Step 8: Hooking up Redux
Now that we've designed both our Firebase and our Redux state, let's go ahead and hook up Redux as well as create our first users module with Redux to keep track of all of the user's state as well as the currently authed user.

 * Create the following path under your `app` folder, `redux/modules`
 * Inside of `modules` create a `users.js` file.
 * Create a users reducer which for now just returns the initial state under the default switch case.
 * Inside of `modules` create an index.js file. This file will export all of our reducers. For now, just export the users reducer which you just created.
 * Now head over to your `app/index.js` in order to hook up Redux.
 * Instead of waiting until later to hook up Redux dev tools as well as React Router Redux, we're going to do it all now.
 * `npm install --save react-router-redux redux-thunk redux react-redux`
 * First thing we need to do is import the neccessary properties. This can get a bit hairy so I'll offer some more help through the next few steps.
 * ```
    import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
    import { Provider } from 'react-redux'
    import thunk from 'redux-thunk'
    import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
    import * as reducers from 'redux/modules'
   ```
 * Now that we have everything we need, let's go ahead and create our store.
 ```
  const store = createStore(combineReducers({...reducers, routing: routerReducer}), compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  ))
 ```
 * Just a refesher of what's going on above, we use combineReducers in order to be able to merge React Router Redux's `routerReducer` with our own reducers. We also use applyMiddleware to make it possible for us to use Redux Thunks in our application.
 * Next, we need to pass `syncHistoryWithStore` but React Router's hashHistory and our store we created in order to create a new history for us. Don't forget to import hashHistory.
 * Now, instead of just rendering our routes, we want to render Redux's Provider passint it our store we created.
 * Nested inside of the Provider is going to be our Routes, however, we need to pass our new history that we created a few steps ago to our Routes to use rather than hashHistory. Head over to `routes.js` and instead of returning routes, return a getRoutes function which takes in an empty (for now) `checkAuth` function as well as our `history` variable.
 * Now back in the `index.js` file invoke `getRoutes` as a child of `Provider` passing it a blank function which just returns true and the `history` variable we created earlier.
 * Head over [HERE](https://github.com/zalmoxisus/redux-devtools-extension) and download the Redux Dev Tools. Once that's downloaded load up the app and open up the 'Redux' devtools tab. Click on "State" and you should be able to see our `users` state as well as `routing` from React Router Redux.
 * Phew! That was a LOT. But now we're in a great position to create a very nice React/Redux application. Again, memorizing all of the steps isn't as important as understanding them all. If you cheat and look at my code, cool. But if you cheat and look at my code while blindly copy/pasting, not cool. If you have a specific question, I'm always available in the Slack channel.

## Step 9: Auth action creators
Now that Redux is set up properly, we want to create some action creators that we can eventually invoke once our user authenticates. When the user is browsing the app we're going to rely on Redux to keep track of it that user is authenticated or not.

 * Inside of your users.js Redux module, create an `authUser` action creator which sets an `isAuthed` property on your state to true and saves the authed users `uid` to an `authedId` property on the state.
 * Create an action creator called `unauthUser` which changes `isAuthed` on the users state to false and resets `authedId` back to an empty string.
 * Now that we have this `isAuthed` variable living in our state, head over to MainContainer.js and connect your MainContainer component so instead of passing in `true` to the <Navigation /> component, we pass in the true value (which by default should be false.)
 * Right now your App should look like this

<img src="http://www.reactjsprogram.com/images/redux-step9.png" width="400">

## Step 10: Prep for Firebase Auth
In order to make our app able to have Facebook authentication, there are a few steps we need do take.

 * If you haven't already head over to firebase.google.com and make an account
 * Once you do that go ahead and make a new project and call it whatever you would like.
 * Once your project is created head to your projects dashboard and click on "Auth" side panel button.
 * From the "Authentication" page click on "SIGN-IN-METHOD" and then click on Facebook.
 * Notice we'll need an APP ID as well as an App Secret. We'll get these from Facebook. In the mean time, copy the url that is at the bottom in the gray box it should look something like this "https://YOUR-PROJECT-XXXX.firebaseapp.com/__/auth/handler".
 * Now head over to [Facebook's Developer's Site](https://developers.facebook.com/) and either sign up or hover over the "My Apps" section in the top right and select "Add a New App" then select Website.
 * Enter in a name for your app and click "Create a new Facebook App"
 * Enter your contact email and choose a category.
 * (Pass the spam filter if needed)
 * Now when your app is approved in the top right hand corner click on "Skip Quick Start"
 * Now on the left hand sidebar click on "Add Product"
 * Then click "Get Started" under the Facebook Auth section.
 * Now if you still have that URL we copied from Firebase go ahead and paste that in the section titled "Valid OAuth redirect URIs" then click "Save Changes" in the lower right.
 * Now head back to your "Dashboard" and then copy your App ID and App Secret and paste them in the appropriate sections under the URL we went to in the Firebase dashboard earlier.
 * If you followed everything correctly your app should now be able to use Facebook authentication.

## Step 11: Firebase Configuration

 * Inside your `config` folder create a constants.js file.
 * Here is where we're going to initialize firebase. But before we do that, go ahead and `npm install --save firebase`
 * Now back in your Firebase console select "Add Firebase to your web app" and copy both the config object as well as the firebase.initializeApp invocation.
 * Inside of your constants.js file import firebase and initialize your app.
 * export two variables from this file. `export const ref = firebase.database().ref()` and `const firebaseAuth = firebase.auth`
 * We'll be importing those variables later to interact with our Firebase database as well as our Firebase Auth module.

## Step 12: Authentication Methods
Now that our Firebase is initialized, let's go ahead and create some helper methods to assist us with authentication.

 * Inside of `app` create a `helpers` folder then inside of that create a `auth.js` file.
 * Create and export as default a function called `auth` which uses `firebaseAuth().signInWithPopup` to auth with Firebase.
 * Create and export a function called `logout` which unauthenticates from Firebase.
 * Create an export a function called saveUser which takes in a user and saves that user to `users/AUTHED-USERS-ID/info` then returns the user.
 * From this point on, all of the weird Webpack/Firebase/etc setup issues are over. So by design these instructions will get less and less detailed. Remember if you get stuck, try to find the solution on your own. If you can't, check out the branch which corresponds with the step. If you're still stuck, ask for help in the Slack channel.

## Step 13: Authenticate!
Now is our moment we've been prepping for. We're going to authenticate with Firebase and save the user (as well as their authed state), into Redux.

 * Even though we have our `authUser` action creator, that isn't doing anything more than just returning an object. Instead, create an action creator called `fetchAndHandleAuthedUser` which is in charge of authenticating the user, saving the users data into Firebase, then authenticating the user (while saving it) to Redux. To do this step you'll leverage the functions we created last step in auth.js as well as a few new action creators you'll make.
 * Once you've finished this action creator update your users Reducer so it correctly modifies the state based on the action creators that were invoked.
 * Now you should have all of your authentication logic encapsulated inside of `fetchAndHandleAuthedUser`, but now we need to actually create the UI which will eventually run that function.
 * Create a FacebookAuthButton stateless functional component which takes in an `isFetchin` prop as well as an `onAuth` prop.
 * Now create an `Authenticate` stateless functional component that is going to be the UI for the `/auth` route. It may be a good idea to use the FacebookAuthButton we created in the last step.
 * Once you've finished that component, you should have a good understanding of what Authenticate needs in order to properly function. So the only step now is to create an AuthenticateContainer which is hooked up to Redux and passes Authenticate everything that it needs. Make sure once you authenticate you redirect the user to the '/results' route, even though it doesn't exist yet.
 * Now the last step is we need to add the AuthenticateContainer we just created to our routes.js file.
 * Go ahead and test your code out now. Fix any errors you have and make sure you can route to the /auth route when you click the "Authenticate" button on the home screen.
 * If you've been following my code you should see that the FacebookAuth button show's "Loading". Why is this? If you look at user.js the initial state that was set has `isFetching` as true. `isFetching` is what the FacebookAuthButton uses to know if it should show 'Loading' or 'Login with Facebook'.
 * We can fix this with a check in our MainContainer. First, inside of users.js create an action creator which changes `isFetching` to false and update the user's Reducer as well.
 * Now, import the action creator you just made into MainContainer, don't forget to use `bindActionCreators` or just dispatch the action creator itself.
 * Now temporarily, call your function which changes `isFetching` to false inside of MainContainer's `componentDidMount` method.
 * Now when MainContainer mounts, `isFetching` should be changed to true which means that the FacebookAuthButton will display the correct text. To test this, head over to your `/auth` route. If you're uncomfortable with this last step check out the code. If you've understood everything until this point you're doing extremely well. Once you get comfortable with action creators and how they're imported into container components, managing your app state becomes a breeze. Our app is going to get more functionality, but there aren't really a whole lot of "new" things from here on out.

## Step 14: /results View
Your app should be in the state where authentication works fine but once you're done authenticating you get an error that says "Warning: [react-router] Location "/results" did not match any routes". This is obviously because we haven't set up that route yet. Let's do that now.

 * Create a stateless functional component called Results which just (for now) renders the text "Results"
 * Create a container component which renders the Results component we created in the previous step.
 * Set up a route so when you go to `/results` you get the container component created in the previous step.
 * Your app should be at the point where you can authenticate, and when you do, you get redirected to the `/results` view and the navigation bar changes to be what it should look like when you're authenticated.

## Step 15: Auth Checks
Currently there are two issues with our authentication set up. The first one is that if you hit refresh, our Redux state gets reset which means `isAuthed` changes to false. The second is related in that we shouldn't be able to access the `/results` route unless we're authenticated. Let's tackle problem #1 first.

 * Firebase has a `.onAuthStateChanged` method which we can use in order to listen to any authentication changes (or initializations) our app goes through. So what we can do is when MainContainer mounts, set up this listener so that whenever we auth, we make sure Redux knows about it. At this point we've already set up the action creator we need (`authUser`) so it's just a matter of hooking it up.
 * Head over to `MainContainer.js` and when it mounts, invoke `firebaseAuth().onAuthStateChanged` and pass it a callback. This callback will receive one parameter which is either null or the authed user. If it's the authed user, format it and save it to Redux. If not, then we want to removeFetchingUser (which should already be there).
  * Great so now we're checking and setting up an authentication listener when our app boots up, but you'll notice there's a weird lag in the UI as Firebase sets up that listener. There are a lot of ways to fix this but a simple one for now is to make it so if `isFetching` in Redux's `users` module is true, then just have `MainContainer` render null. If not, then render the UI. This works because we know that when we call `fetchingUserSuccess` after our `onAuthStateChanged` callback runs, then `isFetching` will get switched the false and the correct UI will render.
  * Now when you hit refresh, if you've already authenticated with Facebook before your app should save the authed user in Redux and then redirect you to the `/results` page.

## Step 16: Redirects
So far so good. But now we want to set up some authentication checks with React Router. Many of our Routes we don't want users to access unless they're verified (and vice versa). To do this we're going to leverage React Router's `onEnter` property. The good news is we've done the hardest part when we set up our `checkAuth` function inside of our `index.js` page. No we just need to fill it out with whatever route logic checks we need then add it to the routes we want to check. The idea is that whatever route we attatch this function to will get called whenever a user enters this route.

 * By leveraging `store.getState()` go ahead and inside of `checkAuth` grab `isAuthed` and `isFetching` off the `users` state in Redux.
 * First thing we want to do is if `isFetching` is still true, just return. The reason we need this is because we don't want to do any route redirects if Firebase is still figuring out if the user is authed or not.
 * Next, grab the next path name by using `nextState.location.pathname` where `nextState` is the first argument that will be passed to `checkAuth`.
 * First check if the next path name is `/` (our index route) or if it's `/auth`, if it is and `isAuthed` is true, go ahead and call `replace` (second argument to checkAuth) passing is `/results`. Basically what this is saying is that if the user is already authenticated, we don't want them to be able to go to the home page or the page to authenticate but instead take them to `/results`.
 * Next, if the path name isn't `/` or `/auth` and the user is not authenticated, then take them to `/auth`. This protects any routes that aren't `/` and `/auth` and will redirect the user to `/auth` instead.
 * Now head over to `routes.js` where `getRoutes` is defined and add `checkAuth` as a prop on all of the routes you want to run `checkAuth` logic on. I have it on `/auth`, `/results`, and the IndexRoute.
 * Now if everything is working you should only be able to access specific routes based on your auth state.