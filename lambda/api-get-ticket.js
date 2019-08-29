const queryService = require('./services/query-service')

module.exports.handler = async (event) => {
  try {
    const ticket = await queryService.getTicket(event.pathParameters.id)
    return {
      statusCode: 200,
      body: JSON.stringify(ticket)
    }
  } catch (error) {
    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t fetch the ticket.'
    }
  }
}
