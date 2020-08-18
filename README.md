# mango-map-server

This is the server side of mango-map which is a social media application based on google map 
fthat allow users to write posts, share images and plan trip.

## How to install
To install this application on a remote computer, first clone the repository to a local machine from Github.

The application requires a PostgreSQL database set up as part of the backend requirements. The necessary migration and seed files are found within their respective folders in this application and are run using the Knex module. 
The commands for the CLI are: 'knex migrate:latest'; 'knex seed:run'

A .env file will also need to be added in the root directory and include the following information. Note that the variable names must be identical.

DATABASE_NAME - Name of PostgreSQL database
DATABASE_USERNAME - Username of PostgreSQL database
DATABASE_PASSWORD - Password for specified username

IMGUR_CLIENT_ID - Registered from Imgur, enable upload images 
SECRET_KEY - used to encrypt the user password with jwt

## Running the application
Ensure that all modules have been installed locally with 'yarn install'. Then the application can simply be run by using 'yarn start'.

