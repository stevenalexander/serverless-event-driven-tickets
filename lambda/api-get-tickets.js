module.exports.queryService = require('./services/query-service') // exposed to allow mocking in tests

module.exports.handler = async () => {
  try {
    const tickets = await this.queryService.getTickets()
    return {
      statusCode: 200,
      body: JSON.stringify(tickets)
    }
  } catch (error) {
    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t fetch the tickets.'
    }
  }
}
