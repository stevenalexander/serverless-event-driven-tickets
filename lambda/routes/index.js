const axios = require('axios')
const express = require('express');
const router = express.Router();

const API_URL = process.env.API_URL || 'http://localhost:3000/api'
const API_GATEWAY_RESOURCE_PATH = process.env.API_GATEWAY_RESOURCE_PATH || '/'

router.get('/', async function(req, res) {
  try {
    let promises = [axios.get(`${API_URL}/tickets`)]
    if (req.query.id) {
      promises.push(axios.get(`${API_URL}/tickets/${req.query.id}`))
    }
    const results = await Promise.all(promises)

    res.render('index', { tickets: results[0].data, ticket: results.length > 1 ? results[1].data : null });
  } catch (error) {
    throw error
  }
});

router.post('/', async function(req, res) {
  res.redirect(`${API_GATEWAY_RESOURCE_PATH}`)
});

module.exports = router;
