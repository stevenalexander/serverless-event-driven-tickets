const AWS = require('aws-sdk') // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const ticketsTableName = process.env.DYNAMODB_TABLE_EVENTS

module.exports.getTickets = () => {
  let params = { TableName: ticketsTableName }

  return new Promise(
    (resolve, reject) => {
      dynamoDb.scan(params, (error, result) => {
        if (error) reject(error)
        resolve(result.Items)
      })
    })
}

module.exports.getTicket = (id) => {
  let params = { TableName: ticketsTableName, Key: { id: id } }

  return new Promise(
    (resolve, reject) => {
      dynamoDb.get(params, (error, result) => {
        if (error) reject(error)
        resolve(result.Item)
      })
    })
}
