/* global describe it */
const assert = require('assert')
const apiGetTickets = require('../../api-get-tickets')

describe('apiGetTickets', function () {
  describe('handler', function () {
    it('should return lambda response object', async function () {
      apiGetTickets.queryService.getTickets = function () { return Promise.resolve([{ id: '1234', text: 'ticket' }]) }
      const response = await apiGetTickets.handler({})

      assert.strictEqual(response.statusCode, 200)
      assert.ok(response.body.includes('"text":"ticket"'))
    })

    it('on error should return lambda response object', async function () {
      apiGetTickets.queryService.getTickets = function () { return Promise.reject(new Error('boom')) }
      const response = await apiGetTickets.handler({})

      assert.strictEqual(response.statusCode, 501)
    })
  })
})
