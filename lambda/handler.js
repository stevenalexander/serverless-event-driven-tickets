'use strict';

module.exports.getTickets = handleHttp;
module.exports.getTicket = handleHttp;
module.exports.createTicket = handleHttp;
module.exports.updateTicket = handleHttp;

async function handleHttp(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }, null, 2),
  };
};
