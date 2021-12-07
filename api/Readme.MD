# REST API with Node using Typescript

This is a simple REST API developed using node and express with typescript

### Getting Started

- `npm install`
- `npm start` - This will start the application and run on port 3000
- `npm run dev` - This will start the application in development mode

you can change port in `.env` file check `.env-sample`

## Folder Structure

```
src
└───index.ts          # Application entry point
└───routes            # Application routes / endpoints
└───controllers       # Express route controllers for all the endpoints of the app
└───repositories      # All the database interaction logic is here
└───db                # DB related files like connection / seed data
└───handlers          # Common logic
└───logs              # application logs
└───middlewares       # express middlewares
└───models            # DB Models (Postgress)
└───validators        # API Request object validations

```
