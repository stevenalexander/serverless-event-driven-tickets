/* global describe it */
const assert = require('assert')
const apiCreateTicket = require('../../api-create-ticket')

describe('apiCreateTicket', function () {
  describe('handler', function () {
    it('should return lambda response object', async function () {
      apiCreateTicket.commandService.createTicket = function () { return Promise.resolve({ id: '1234', text: 'ticket' }) }
      const response = await apiCreateTicket.handler({ body: '{"text":"ticket"}' })

      assert.strictEqual(response.statusCode, 200)
      assert.ok(response.body.includes('"text":"ticket"'))
    })

    it('on validation error should return lambda response object', async function () {
      apiCreateTicket.commandService.createTicket = function () { return Promise.resolve({ id: '1234', text: 'ticket' }) }
      const response = await apiCreateTicket.handler({ body: 'not valid JSON' })

      assert.strictEqual(response.statusCode, 501)
    })

    it('on error should return lambda response object', async function () {
      apiCreateTicket.commandService.createTicket = function () { return Promise.reject(new Error('boom')) }
      const response = await apiCreateTicket.handler({ body: '{"text":"ticket"}' })

      assert.strictEqual(response.statusCode, 501)
    })
  })
})
