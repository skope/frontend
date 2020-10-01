# Psykedelia

This repository contains frontend application for psykedelia.org

## Run

- Clone the repository
- Copy `.env.example` to `.env`
- Execute `yarn install`
- Execute `yarn start`

Application listens to http://localhost:3000/

## Environment variables

Configurations in the app are made in `.env` file. Due to [restriction](https://create-react-app.dev/docs/adding-custom-environment-variables/) in create-react-app, one has to prefix their variables with `REACT_APP_` to be able to use them inside the app.

Following environment variables are available:

- `PORT` Port the application will listen to
- `REACT_APP_GRAPHQL_URI` Location for the GraphQL backend
