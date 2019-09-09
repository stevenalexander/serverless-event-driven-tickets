/* global describe it */

const assert = require('assert')
const webCreateTicket = require('../../web-create-ticket')

describe('webCreateTicket', function () {
  describe('handler', function () {
    it('should return lambda http redirect response object', async function () {
      webCreateTicket.commandService.createTicket = function () { return Promise.resolve({ id: '1234', text: 'ticket' }) }
      const response = await webCreateTicket.handler({ body: 'text=ticket', headers: { Referer: 'http://gateway/' } })

      assert.strictEqual(response.statusCode, 303)
      assert.ok(response.headers.Location)
    })

    it('on validation error should return lambda response object', async function () {
      webCreateTicket.commandService.createTicket = function () { return Promise.resolve({ id: '1234', text: 'ticket' }) }
      const response = await webCreateTicket.handler({ body: 'wrong=1234' })

      assert.strictEqual(response.statusCode, 400)
    })

    it('on error should return lambda response object', async function () {
      webCreateTicket.commandService.createTicket = function () { return Promise.reject(new Error('boom')) }
      const response = await webCreateTicket.handler({ body: 'text=ticket', headers: { Referer: 'http://gateway/' } })

      assert.strictEqual(response.statusCode, 500)
    })
  })
})
