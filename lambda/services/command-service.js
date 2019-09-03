const AWS = require('aws-sdk') // eslint-disable-line import/no-extraneous-dependencies
const uuidv1 = require('uuid/v1') // create via timestamp, see npm uuid

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const ticketsTableName = process.env.DYNAMODB_TABLE_EVENTS

module.exports.createTicket = (ticket) => {
  return new Promise(
    (resolve, reject) => {
      try {
        const timestamp = new Date().getTime()
        const params = {
          TableName: ticketsTableName,
          Item: {
            id: uuidv1(),
            text: ticket.text,
            checked: false,
            createdAt: timestamp,
            updatedAt: timestamp
          }
        }
        dynamoDb.put(params, (error) => {
          if (error) reject(error)
          resolve(params.Item)
        })
      } catch (error) {
        reject(error)
      }
    })
}

module.exports.updateTicket = (ticket) => {
  return new Promise(
    (resolve, reject) => {
      try {
        const timestamp = new Date().getTime()
        const params = {
          TableName: ticketsTableName,
          Key: {
            id: ticket.id
          },
          ExpressionAttributeNames: {
            '#ticket_text': 'text'
          },
          ExpressionAttributeValues: {
            ':text': ticket.text,
            ':checked': ticket.checked,
            ':updatedAt': timestamp
          },
          UpdateExpression: 'SET #ticket_text = :text, checked = :checked, updatedAt = :updatedAt',
          ReturnValues: 'ALL_NEW'
        }
        dynamoDb.update(params, (error, result) => {
          if (error) reject(error)
          resolve(result.Attributes)
        })
      } catch (error) {
        reject(error)
      }
    })
}
