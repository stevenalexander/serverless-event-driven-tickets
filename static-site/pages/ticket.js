import Layout from '../components/layout.js';
import fetch from 'isomorphic-unfetch';

const Ticket = props => (
  <Layout>
    <h1>Ticket</h1>
    <div>
      <div><b>ID:</b>{props.ticket.id}</div>
      <div><b>Description:</b>{props.ticket.description}</div>
      <div><b>Details:</b>{props.ticket.details}</div>
      <div><b>Status:</b>{props.ticket.status}</div>
      <div><b>SubmittedBy:</b>{props.ticket.submittedBy}</div>
      <div><b>Created:</b>{props.ticket.createdDate}</div>
      <div><b>Modified:</b>{props.ticket.modifiedDate}</div>
    </div>
  </Layout>
);

Ticket.getInitialProps = async ({ query }) => {
  const id = query.id
  const res = await fetch(`http://localhost:3001/tickets/${id}`);
  const data = await res.json();

  console.log(`Show data fetched: ${JSON.stringify(data)}`);

  return {
    ticket: data
  };
}

export default Ticket;