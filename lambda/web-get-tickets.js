const html = require('./templates/html')

module.exports.queryService = require('./services/query-service') // exposed to allow mocking in tests

module.exports.handler = async (event, context) => {
  try {
    const tickets = await this.queryService.getTickets()
    return html.getHtmlResponse(200, html.getHtmlTickets(tickets))
  } catch (error) {
    return html.getHtmlResponse(500, html.getHtmlError(error))
  }
}
