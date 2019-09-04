/* global describe it */
const assert = require('assert')
const apiGetTicket = require('../../api-get-ticket')

describe('apiGetTicket', function () {
  describe('handler', function () {
    it('should return lambda response object', async function () {
      apiGetTicket.queryService.getTicket = function () { return Promise.resolve({ id: '1234', text: 'ticket' }) }
      const response = await apiGetTicket.handler({ pathParameters: { id: '12345' } })

      assert.strictEqual(response.statusCode, 200)
      assert.ok(response.body.includes('"text":"ticket"'))
    })

    it('on error should return lambda response object', async function () {
      apiGetTicket.queryService.getTicket = function () { return Promise.reject(new Error('boom')) }
      const response = await apiGetTicket.handler({})

      assert.strictEqual(response.statusCode, 501)
    })
  })
})
