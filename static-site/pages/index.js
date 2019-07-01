import Layout from '../components/layout.js';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = props => (
  <Layout>
    <h1>Tickets</h1>
    <ul>
      {props.tickets.map(ticket => (
        <li key={ticket.id}>
          <Link href={`/ticket?id=${ticket.id}`}>
            <a>{ticket.description}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch('http://localhost:3001/tickets');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    tickets: data
  };
};

export default Index;