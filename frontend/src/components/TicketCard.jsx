import { Link } from 'react-router-dom';

function TicketCard({ ticket }) {
  return (
    <Link
      to={`/tickets/${ticket._id}`}
      className="card shadow-md p-4 bg-gray-800 hover:bg-gray-700 transition-colors block"
    >
      <h3 className="font-bold text-lg">{ticket.title}</h3>
      <p className="text-sm mb-2">{ticket.description}</p>
      <p className="text-xs text-gray-400">
        Created At: {new Date(ticket.createdAt).toLocaleString()}
      </p>
    </Link>
  );
}

export default TicketCard; 