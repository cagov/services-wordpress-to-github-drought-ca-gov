# wordpress-to-github implementation for drought.ca.gov

This is the [wordpress-to-github](https://www.npmjs.com/package/@cagov/wordpress-to-github) implementation for [drought.ca.gov](https://drought.ca.gov).

## Deploys services to the following AWS Function

- https://212r75puka.execute-api.us-west-1.amazonaws.com

## Target site source

Allk read and write targets are defined in ```src/shared/endpoints.json``` 

This project is reading from all the drought pantheon instances and writing any updates to the corresponding branches in the drought.ca.gov github repo.

## Development

The latest version of this function was created with the open source library <a href="https://arc.codes">architect</a>. 

Environment variables are defined using arc env statements. When developing locally you can run:

```
arc env
```

The above command will write a local preferences.arc file which is already in the gitignore that contains all the variables defined in all environments.

This project can be run locally using:

```
npm run dev
```

The above local script will run the standard arc sandbox start command.

This project consists of logic executed in crons. During major rewrites it was helpful to move that logic from the crons into the http file so it could be executed at will instead of on a schedule.

## Deployment

This service is a collection of crons run on a schedule defined in app.arc. 

Normally architect lambdas are deployed to identical staging and production environments on AWS. This repo has no mechanism yet to avoid having the cron execute in the staging environment so it is only deployed to a production environment. 

```
npx arc deploy --production
```

If it were deployed to both production and staging environemnts in its current state it would execute twice every 5 minutes unnecessarily. The execution time I am seeing in the production environment is ~17 seconds.

### Slack reporting

Slack channels for reporting are defined in the ```src/shared/endpoints.json``` they can be updated to reference new channels and will report there as long as the bot is invited to the new channel.