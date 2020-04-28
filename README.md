# CoronaJobs Web Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup for Development Environment

+ Clone this repo
+ In the command line:
  ```
    $ cd frontend
  ```
+ To build the image with docker-compose:
  ```
    $ docker-compose build
  ```
+ Run container:
  ```
  $ docker-compose up
  ```

+ open [http://localhost:3001](http://localhost:3001) to view it in the browser.

+ to open the container's terminal:
  ```
  $ docker exec -it corona-jobs /bin/sh
  ```

[Initial Setup Source](https://mherman.org/blog/dockerizing-a-react-app/)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


## Pull Request Template

# Description
Please include a description of the changes and relevant information. List any dependencies that are required for this change.
## Type of change
Please delete options that are not relevant.
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature HTML / CSS (please include before/after screenshot)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
# How Has This Been Tested?
Please describe the tests that you ran to verify your changes (Like web browser's or mobile devices). Provide instructions so we can reproduce.
- [ ] Chrome Desktop
- [ ] Safari Desktop
- [ ] Chrome Mobile (not desktop emulator)
- [ ] iOS Mobile (not desktop emulator)
# Screenshots (Only if need)
#### Before this PR
#### After this PR
# Checklist:
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have unsuscribed from observables in Components when not using the async Pipe
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings
- [ ] The target of this commit is 'dev'
- [ ] Any dependent changes have been merged and published in downstream modules
