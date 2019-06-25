# Serverless event driven tickets

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

## Links

* [Serverless Framework](https://github.com/serverless/serverless#readme)
* [nextjs](https://nextjs.org)