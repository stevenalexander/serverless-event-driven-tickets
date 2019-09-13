# Serverless event driven tickets

[![BuildStatus](https://github.com/stevenalexander/serverless-event-driven-tickets/workflows/Node%20CI/badge.svg)](https://github.com/stevenalexander/serverless-event-driven-tickets/actions)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

WORK IN PROGRESS

Example solution using serverless hosting to submit and view tickets.

Components
* Lambdas created using Serverless Framework
* AWS DynamoDB for storage

## Requires

* NodeJS
* AWS account and AWS CLI with access token setup in `~/.aws`

## Run locally

```
# api
cd lambda
npm install
serverless offline start
```

## Deploy

Lambdas
```
cd lambdas
serverless deploy -v
```

## Architecture

![Component diagram](https://github.com/stevenalexander/serverless-event-driven-tickets/raw/master/docs/images/serverless-tickets-components.png "Component diagram")

![Sequence diagram](https://github.com/stevenalexander/serverless-event-driven-tickets/raw/master/docs/images/websequencediagrams-event-driven-ticket-solution-with-cqrs.png "Sequence diagram")

<!--- websequencediagrams.com with double dashes replaced with 00
title Event driven Ticket solution with CQRS

participant User
participant Web
participant CommandService
participant QueryService
participant EventStore
participant EventHandler
participant QueryStore

User->Web: Submit ticket
Web->CommandService: POST /Tickets
note right of CommandService: Performs validation\nand business logic
CommandService->EventStore: CreateTicket event
note right of CommandService: Will return success after event is persisted\nbut Ticket may not appear until event is\nprocessed (eventual consistency)
CommandService00>Web: Async success response
Web00>User: Ticket created success response
note right of EventStore: Event is persisted in store and\ncan be replayed if necessary
EventStore->EventHandler: New event
EventHandler->QueryStore: Update materalised view\nfor new Ticket

User->Web: View tickets
Web->QueryService: GET /Tickets
QueryService->QueryStore: Query materalised view for list of tickets
QueryStore00>QueryService: Tickets list
QueryService00>Web: Tickets list response
Web->User: List of Tickets

User->Web: View a ticket
Web->QueryService: GET /Tickets/{id}
QueryService->QueryStore: Query materalised view for ticket
QueryStore00>QueryService: Ticket
QueryService00>Web: Ticket response
Web->User: Ticket details

User->Web: Update ticket
Web->CommandService: PUT /Tickets/{id}
CommandService->EventStore: UpdateTicket event
CommandService00>Web: Async success response
Web00>User: Ticket updated success response
EventStore->EventHandler: New event
EventHandler->QueryStore: Update materalised view\nfor updated Ticket

--->

## Links

* [Serverless Framework](https://github.com/serverless/serverless#readme)
* [Example - aws-node-rest-api-with-dynamodb](https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb)
* [Blog - How To Create a Serverless Node.js App with DynamoDB For The First Time](https://medium.com/statuscode/serverless-ice-cream-or-create-your-serverless-node-js-micro-service-with-a-database-17a6946251e0) - outdated serverless config but useful context
* [Example - Serverless Framework project code for creating DynamoDB triggered lambda](https://github.com/DavidWells/serverless-workshop/tree/master/lessons-code-complete/events/dynamodb-streams) - best example config I've found, there seems to be multiple ways to do this and some didn't work for me

## TODO

* [Use AWS layers to handle node_modules rather than packaging them](https://medium.com/the-apps-team/how-to-add-nodejs-library-dependencies-in-a-aws-lambda-layer-with-serverless-framework-d774cb867197)
* Tests do not cover checking values are passed to services correctly or detailed functionality

## Tech/Design comments

* **Why AWS?** Clear documentation, great tooling, lots of examples/patterns especially for Serverless Framework, fast deployment, rapid testing cycles, offline support. I tried Azure but found it frustrating in comparison, with 15 minute deployments, poor documentation and support.
* **Why a single Lambda project?** Putting all the different Web/API functions in a single project isn't my normal approach, I like to split things out into separate repos/projects with tests/deployments. But single project works well with the Serverless Framework, which creates a single API Gateway to expose the Lambdas and link their dependencies. Lambdas can share code without fuss. Deployments are single push, putting the common deployment package with code into S3 and updating all Lambdas at once. How far this can scale for complexity I don't know, the limit for deployment packages in S3 is 250 MB (see [here](https://dzone.com/articles/exploring-aws-lambda-deployment-limits)) and this project is around 8 MB without many Node modules.
* **Why not use Express?** It's not hard to use Express with Lambdas, there is a good wrapper [aws-serverless-express](https://github.com/awslabs/aws-serverless-express) which makes it easy to direct HTTP requests to an Express application. For this project I wanted to keep things as low level as possible, with individual lambdas using a single script each (with common code extracted), so I was forced to understand how Lambda sends requests with event/context/path/parameters. For a more complex application with developers who are familiar with Express it might make sense to use it for Lambdas, particular HTML functions.
* **Why no templating engine?** I wanted to keep things as simple as possible and since the HTML being returned in responses was basic I just stuck to using JavaScript Template Literals. If I had more complex HTML I would look at including a templating library and how it could fit in a Lambda project (e.g. how to reference template files).
