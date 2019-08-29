const AWS = require('aws-sdk') // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const params = {
  TableName: process.env.DYNAMODB_TABLE_EVENTS
}

module.exports.getTickets = (callback) => {
  dynamoDb.scan(params, (error, result) => {
    if (error) {
      callback(error)
      return
    }

    callback(null, result.Items)
  })
}
