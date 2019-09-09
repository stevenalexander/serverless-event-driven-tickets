/* global describe it */

const assert = require('assert')
const webGetTickets = require('../../web-get-tickets')

describe('webGetTickets', function () {
  describe('handler', function () {
    it('should return lambda response object', async function () {
      webGetTickets.queryService.getTickets = function () { return Promise.resolve([{ id: '1234', text: 'ticketHtml' }]) }
      const response = await webGetTickets.handler({})

      assert.strictEqual(response.statusCode, 200)
      assert.ok(response.body.includes('<html'))
      assert.ok(response.body.includes('ticketHtml'))
    })

    it('on error should return lambda response object', async function () {
      webGetTickets.queryService.getTickets = function () { return Promise.reject(new Error('boom')) }
      const response = await webGetTickets.handler({})

      assert.strictEqual(response.statusCode, 500)
    })
  })
})
