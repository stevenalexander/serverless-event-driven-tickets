/* global describe it */
const assert = require('assert')
const html = require('../../../templates/html')

describe('html', function () {
  describe('getHtmlResponse', function () {
    it('should return lambda html response object', function () {
      const htmlString = '<html>content</html>'
      const response = html.getHtmlResponse(200, htmlString)

      assert.strictEqual(response.statusCode, 200)
      assert.strictEqual(response.headers['Content-Type'], 'text/html')
      assert.strictEqual(response.body, htmlString)
    })
  })

  describe('getHtmlRedirectResponse', function () {
    it('should return lambda html redirect response object', function () {
      const redirectUrl = 'http://goto'
      const response = html.getHtmlRedirectResponse(redirectUrl)

      assert.strictEqual(response.statusCode, 303)
      assert.strictEqual(response.headers['Location'], redirectUrl)
    })
  })

  describe('getHtmlLayout', function () {
    it('should return html for base layout', function () {
      const htmlString = html.getHtmlLayout('mytitle', 'myheader', '<p>mycontent</p>')

      assert.ok(htmlString.includes('<title>mytitle</title>'))
      assert.ok(htmlString.includes('<h1>myheader</h1>'))
      assert.ok(htmlString.includes('<p>mycontent</p>'))
    })
  })

  describe('getHtmlError', function () {
    it('should return html for an html error response', function () {
      const htmlString = html.getHtmlError({ message: 'boom' })

      assert.ok(htmlString.includes('An error has occurred'))
      assert.ok(htmlString.includes('boom'))
    })
  })

  describe('getHtmlTickets', function () {
    it('should return html for an html tickets table response', function () {
      const htmlString = html.getHtmlTickets([])

      assert.ok(htmlString.includes('Serverless ticketing example.'))
      assert.ok(htmlString.includes('<table'))
    })
  })
})
