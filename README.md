# PawPals

PawPals connects dog owners with dog walkers in their community that they can hire, with streamlined scheduling, purchasing, and real-time tracking of their dogs.

## The Pawstack Team

- [Yang Lu](https://github.com/youngyanglu)
- [Tiffany Choy](https://github.com/tiffanycchoy)
- [Martin Chang](https://github.com/mkchang)
- [Nova Qiu](https://github.com/novyQ)

## Roadmap

View the project Trello Board [here](https://trello.com/b/FZuumD8M/pawpals).
View the project roadmap [here](https://docs.google.com/document/d/1LWzn1SkVHaMaY1HimDusVBBAdVLWXDyRKjBlrPgLf8I/edit?usp=sharing).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

# Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [App Configuration](#app-configuration)
  1. [Passport Google OAuth Login](#passport-google-oauth-login)
  1. [Google Maps API](#google-maps-api)
  1. [FileStack API](#filestack-api)
  1. [Stripe API](#stripe-api)
  1. [Heroku](#heroku)
  1. [Travis-CI](#travis-ci)
1. [Database Initialization](#database-initialization)
  1. [Database Creation](#database-creation)
  1. [Run Migrations & Data Seeds](#run-migrations--data-seeds)
1. [Running the App](#running-the-app)

## Usage

See the deployed app [here](https://paw-pals.herokuapp.com/).

## Requirements

- Node 6.11.2
- Redis 4.0.1
- Postgresql 9.6.5, server 9.6.4
- Yarn 1.x

## Development

### Installing System Dependencies

```
brew install yarn
brew install redis
brew install postgresql
```

### Install Project Dependencies

```
yarn global add grunt-cli knex eslint
yarn install
```

## App Configuration

Override settings `config/default.json` in any environment by making a copy of `config/ENV.example.json` and naming it `config/ENV.json` and setting the appropriate variable. 

For environments that require use of environment variables, you can supply variables as defined in `config/custom-environment-variables.json`.

See https://www.npmjs.com/package/config
And https://github.com/lorenwest/node-config/wiki/Environment-Variables#custom-environment-variables

### Passport Google OAuth Login

Follow the instructions for [Passport's Google Strategy](https://github.com/jaredhanson/passport-google-oauth2), this will require making a new project and app in that project. Fill in the Client ID, secret, and callback URL into config files. You will also need to [enable the Google+ API](https://console.developers.google.com/apis/api/plus.googleapis.com) for your project.

### Google Maps API

This project uses the [Google Places API Javascript Library](https://developers.google.com/maps/documentation/static-maps/) and the [Google Static Maps API](https://developers.google.com/maps/documentation/static-maps/). Set up requires enabling each API in your google project and including the key wherever the API is used.

### FileStack API 

This project uses [FileStack](https://www.filestack.com/features/file-uploader) for image uploading. To use FileStack, [register](https://dev.filestack.com/register/) for an API key. Free usage is limited to 250 photos per month.

### Stripe API  

FILL ME IN

### Heroku 

FILL ME IN

### Travis-CI  

Follow the instructions for continuous integration with [Travis-CI](https://travis-ci.org/). To access config variables needed for tests, add them to your [Travis-CI environment](https://docs.travis-ci.com/user/environment-variables/). 

## Database Initialization

IMPORTANT: ensure `postgres` is running before performing these steps.

### Database Creation:

Use grunt to create a new database for your development and test environments:

Development envronment: `grunt pgcreatedb:default`

Other environments, specify like so: `NODE_ENV=test grunt pgcreatedb:default`

### Run Migrations & Data Seeds

In terminal, from the root directory:

To migrate to the latest version, run:

`knex migrate:latest --env NODE_ENV`

To rollback a version, run:

`knex migrate:rollback --env NODE_ENV`

To populate the database with seed data, run:

`knex seed:run --env NODE_ENV`

Note: `--env NODE_ENV` may be omitted for development. For example, `knex migrate:latest` will run all migrations in the development environment, while `knex migrate:latest --env test` will migrate in the test environment.

If using Heroku to deploy, migrations can be run by prepending `heroku run` to all commands. For example, to migrate to latest, run:
`heroku run knex migrate:latest`

## Running the App

To run webpack build: `yarn run build`

To run server: `yarn run start`

To run tests: `yarn run test`

To run your redis server for the session store `redis-server`


