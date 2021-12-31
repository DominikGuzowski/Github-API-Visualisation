# GitHub API Metric Visualiser

### Recommended Browser: Google Chrome. 
No tests were done on other browers and hence the app may **not** look or behave as expected.

### You can view the live app [here](https://github-api-metric-visualiser-dg.netlify.app/).

## Run the app yourself with Docker!

#### 1. Pull the app from GitHub!
`git clone https://github.com/DominikGuzowski/Github-API-Visualisation.git`

#### 2. Enter the project directory.
`cd ./GitHub-API-Visualisation`

#### 3. Set up the .env file. (OPTIONAL)
***This step requires a FireBase account with a project fully set up with authentication features and connected to your GitHub account.***
***This will allow you to log in using the GitHub Authentication Provider, otherwise the only way to log in to the local instance of the app will be to use your GitHub login and the API token.***

In the project directory add a .env with the following information:
 - REACT_APP_FIREBASE_API_KEY=*< Your Firebase Project API Key >*
 - REACT_APP_FIREBASE_DOMAIN=*< Your Firebase Project Domain >*
 - REACT_APP_FIREBASE_PROJECT_ID=*< Your Firebase Project ID >*
 - REACT_APP_FIREBASE_STORAGE_BUCKET=*< Your Firebase Project Storage Bucket >*
 - REACT_APP_FIREBASE_SENDER_ID=*< Your Firebase Message Sender ID >*
 - REACT_APP_FIREBASE_APP_ID=*< Your Firebase App ID >*

#### 4. Run the app.
`docker-compose up`
This may take a few minutes depending on your internet speed as all dependencies will be installed to run the project as well as it may take some time to compile the project.

#### 5. Open the app in the browser.
Go to http://localhost:3000 in your browser to view the app.