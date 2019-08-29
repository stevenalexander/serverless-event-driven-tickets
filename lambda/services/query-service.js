const AWS = require('aws-sdk') // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const params = {
  TableName: process.env.DYNAMODB_TABLE_EVENTS
}

module.exports.getTickets = () => {
  return new Promise(
    (resolve, reject) => {
      dynamoDb.scan(params, (error, result) => {
        if (error) reject(error)

        resolve(result.Items)
      })
    })
}
