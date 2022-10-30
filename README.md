# Steps to run on local computer

If you do not have Node.js, download [it](https://nodejs.org/en/download/) first

In the frontend directory, run:

### `npm install`

Which will install all the necessary React packages from `package.json` and `package_lock.json`

Then run:

### `npm start`

To open [http://localhost:3000](http://localhost:3000)

The page will reload when you make changes. You may also see any lint errors in the console.

In the backend directory, run:

### `node app.js`

Both the frontend and backend needs to be run together when developing 

# Suggestions for development
1. Create a new branch for each task/page you're working on and only create a pull request when completed
2. Use `inspect` to see the feedback of from print and log statements. Especially useful for checking backend response in frontend