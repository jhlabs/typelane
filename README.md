# Typelane

## Installation

1. Clone repo and run `npm install`
2. Make sure you have a postgres locally running
3. Enter postgres db details in the `env.example` file and rename to `.env`
4. Run `npm run dev` for development.
5. To deploy the service simply commit and push to github

## Endpoints

The Api exposes two endpoints:

- GET | https://typelane-web-service.onrender.com/employees
- POST | https://typelane-web-service.onrender.com/employees

You can test the api endpoints on Postman with explanations and values added below.

[![Open in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a9b7fd61677e06b2f7ff)

## Description

This project uses the following technologies:

- NodeJS
- ExpressJS
- Typescript
- Postgres
- TypeORM - Easy to use ORM that works well with classes and Typescript's type system
- routing-controllers - Implements class-based controllers for express
- class-validators - Allows to validate classes, both for controllers and entities

## Limitations

Due to the scoped assigment, there are several limitations to this project:

- The controller is too large and several components could have been extracted into seperate classes
- The file structure does not scale well for larger projects. I would have setup seperate modules and a domain-driven architecture to structure the classes.
- Http error codes have largely been ignored
- Validation is limited so far (e.g. most likely the email field should be a unique constraint in the model)
- The seed script could have been built more robust and refactored to be more generic
- In general several logic components could have been extracted and generically applied

## FAQ

### Why did you call the user model "employees"?

In almost every web application there exists a user model. This usually handles the generic use cases of authentication and authorization. For example login, registration, password reset, etc. The model handling the core business logic should be separated out into it's own, here employees. Even though it is opinionated, probably the `email` and also `is_admin` fields should most likely be in the users model, while the other fields should stay in the employees model.

### Why did you choose to host the database and web service on render.com?

Render.com makes it very easy to implement a continuous deployment from your github repo. You can deploy almost all relevant pieces of a web-based app like static sites, web services or databases. The pricing is fair and transparent. You can even host entire Kubernetes cluster on there and a lot of features are included out of the box, such as load balancing and SSL.
