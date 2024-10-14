# Domain Registration Platform

This project is a domain registration platform built with Next.js. It utilizes Google Cloud Platform (GCP) OAuth2 for user authentication and GoDaddy APIs to check domain availability and suggest similar domain names.

## Installation

To set up the project locally, follow these steps:
`
OTE_KEY=godady ote key
OTE_SECRET=godady secret
GOOGLE_ID=GCP id
GOOGLE_CLIENT_SECRET=GCP client secret

1. update the .env file with keys
2. open the folder with vscode
3. run `npm i` to install dependencies
4. run `npm run db` this will start a json-server which will mimic as a backend server
5. run `npm run dev` this will start next.js server
6. The application will be running at localhost:3000

## Tech, libraries, apis used

1. Next js
2. axios
3. react-query -- to fetch data form server
4. react-icons -- icons library
5. godaday api -- to fetch domain availability and suggestions
6. GCP oAuth2 -- to authenticate the user using gmail
