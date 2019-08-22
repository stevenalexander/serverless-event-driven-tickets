'use strict'
const awsServerlessExpress = require('aws-serverless-express')
const app = require('./app')
const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => {
  // FIXME: Ugly workaround for https://github.com/awslabs/aws-serverless-express/issues/86
  const API_GATEWAY_RESOURCE_PATH = process.env.API_GATEWAY_RESOURCE_PATH || ''
  if (API_GATEWAY_RESOURCE_PATH && event.path.startsWith(API_GATEWAY_RESOURCE_PATH)) {
    event.path = event.path.replace(API_GATEWAY_RESOURCE_PATH, '')
  }
  awsServerlessExpress.proxy(server, event, context)
}