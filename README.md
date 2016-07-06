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
  ```npm install --save react react-dom && npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0 css-loader html-webpack-plugin style-loader webpack webpack-dev-server```
 * Create and configure your .babelrc file
 * Create and configure your webpack.config.js file
 * Create an app directory and in your app directory create and configure your index.html file
 * In your app directory create and configure your index.js file to render a HelloWorld component
 * Start webpack and make sure everything is working
 * Add a `production` command to your scripts property in package.json which runs `webpack -p`
 * Add a `start` command to your scripts property in package.json which runs `webpack-dev-server`
 * Run `npm run start` from your terminal then check `localhost:8080` to make sure everything is rendering correctly
