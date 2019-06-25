# Serverless event driven tickets

WORK IN PROGRESS

Example solution using serverless hosting to submit and view tickets.

Components
* NextJS static site
* Lambdas created using Serverless Framework

## Requires

* NodeJS
* AWS account and AWS CLI with access token setup in `~/.aws`

## Run locally

```
# web
cd static-site
npm install
npm start # http://localhost:3000
```

## Deploy

Static-site
1. Create S3 bucket and setup for static site hosting with public access
2. Run static-site `npm run export` and copy contents of `static-site/out` to S3 bucket

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
* [nextjs](https://nextjs.org)