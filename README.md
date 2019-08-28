# Serverless event driven tickets

[![BuildStatus](https://github.com/stevenalexander/serverless-event-driven-tickets/workflows/Node%20CI/badge.svg)](https://github.com/stevenalexander/serverless-event-driven-tickets/actions)

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

## TODO

* [Use AWS layers to handle node_modules rather than packaging them](https://medium.com/the-apps-team/how-to-add-nodejs-library-dependencies-in-a-aws-lambda-layer-with-serverless-framework-d774cb867197)