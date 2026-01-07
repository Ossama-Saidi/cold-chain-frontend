import React, { useEffect, useState } from 'react';
import { fetchTickets, updateTicket } from '../../services/api';
import TicketCard from './TicketCard';

const TicketsTab = () => {
  const [tickets, setTickets] = useState([]);

  const loadTickets = async () => {
    const data = await fetchTickets();
    setTickets(data);
  };

  const handleClose = async (ticketId) => {
    await updateTicket(ticketId, { statut: "clos" });
    loadTickets();
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Ticket Management</h2>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          + Create Ticket
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {tickets.map(ticket => (
          <TicketCard 
            key={ticket.id} 
            ticket={ticket}
            refresh={loadTickets}
            onClose={() => handleClose(ticket.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TicketsTab;