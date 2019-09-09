/* global describe it */
const assert = require('assert')
const apiUpdateTicket = require('../../api-update-ticket')

describe('apiUpdateTicket', function () {
  describe('handler', function () {
    it('should return lambda response object', async function () {
      apiUpdateTicket.commandService.updateTicket = function () { return Promise.resolve({ id: '1234', text: 'ticket' }) }
      const response = await apiUpdateTicket.handler({ body: '{"text":"ticket","checked":false}', pathParameters: { id: '1234' } })

      assert.strictEqual(response.statusCode, 200)
      assert.ok(response.body.includes('"text":"ticket"'))
    })

    it('on validation error should return lambda response object', async function () {
      apiUpdateTicket.commandService.updateTicket = function () { return Promise.resolve({ id: '1234', text: 'ticket' }) }
      const response = await apiUpdateTicket.handler({ body: 'not valid JSON' })

      assert.strictEqual(response.statusCode, 501)
    })

    it('on error should return lambda response object', async function () {
      apiUpdateTicket.commandService.updateTicket = function () { return Promise.reject(new Error('boom')) }
      const response = await apiUpdateTicket.handler({ body: '{"text":"ticket", "checked":false}', pathParameters: { id: '1234' } })

      assert.strictEqual(response.statusCode, 501)
    })
  })
})
