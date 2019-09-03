const html = require('./templates/html')
const queryService = require('./services/query-service')

module.exports.handler = async (event, context) => {
  try {
    const tickets = await queryService.getTickets()
    return html.getHtmlResponse(200, html.getHtmlTickets(tickets))
  } catch (error) {
    return html.getHtmlResponse(500, html.getHtmlError(error))
  }
}
