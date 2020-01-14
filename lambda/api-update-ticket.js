module.exports.commandService = require('./services/command-service') // exposed to allow mocking in tests

module.exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body)
    if (typeof data.text !== 'string' || typeof data.checked !== 'boolean') {
      console.error('Validation Failed')
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t update the ticket.'
      }
    }
    data.id = event.pathParameters.id

    const ticket = await this.commandService.updateTicket(data)
    return {
      statusCode: 200,
      body: JSON.stringify(ticket)
    }
  } catch (error) {
    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(error)
    }
  }
}
