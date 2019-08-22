'use strict';

module.exports.getTickets = async function(event) {
  return {
    statusCode: 200,
    body: JSON.stringify([
      { id: 1, description: 'Need new monitor', details: 'I need a new monitor', status: 'Submitted', submittedBy: 'joeb', createdDate: new Date().toISOString(), modifiedDate: new Date().toISOString() },
      { id: 2, description: 'Issue with keyboard', details: 'Keyboard is broken', status: 'Active', submittedBy: 'adama', createdDate: new Date().toISOString(), modifiedDate: new Date().toISOString() },
      { id: 3, description: 'Cannot login', details: 'Need to reset my login', status: 'Closed', submittedBy: 'janed', createdDate: new Date().toISOString(), modifiedDate: new Date().toISOString() }
    ], null, 2),
  };
};

module.exports.getTicket = async function(event) {
  return {
    statusCode: 200,
    body: JSON.stringify(
      { id: 1, description: 'Need new monitor', details: 'I need a new monitor', status: 'Submitted', submittedBy: 'joeb', createdDate: new Date().toISOString(), modifiedDate: new Date().toISOString() }
    , null, 2),
  };
};

module.exports.createTicket = async function(event) {
  return {
    statusCode: 200,
    body: JSON.stringify(
      { message: 'Ticket created', id: 1 }
    , null, 2),
  };
};

module.exports.updateTicket = async function(event) {
  return {
    statusCode: 200,
    body: JSON.stringify(
      { message: 'Ticket updated', id: 1 }
    , null, 2),
  };
};
