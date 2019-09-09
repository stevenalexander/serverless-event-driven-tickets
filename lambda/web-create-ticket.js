const querystring = require('querystring')
const html = require('./templates/html')

module.exports.commandService = require('./services/command-service') // exposed to allow mocking in tests

module.exports.handler = async (event, context) => {
  try {
    const data = querystring.parse(event.body)
    if (typeof data.text !== 'string') {
      return html.getHtmlResponse(400, html.getHtmlError(new Error('Validation error, couldn\'t create the ticket.')))
    }

    await this.commandService.createTicket(data)
    return html.getHtmlRedirectResponse(event.headers.Referer || './')
  } catch (error) {
    return html.getHtmlResponse(500, html.getHtmlError(error))
  }
}
