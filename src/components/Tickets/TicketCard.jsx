import React from 'react';
import { formatDate, getStatusColor } from '../../utils/helpers';
import { closeTicket } from "../../services/api";

const TicketCard = ({ ticket, refresh }) => {
  const handleClose = async () => {
    await closeTicket(ticket.id);
    refresh();
  };
  const priority = ticket.priorite || 'haute';
  const status = ticket.statut || 'ouvert';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Ticket #{ticket.id}
            </h3>

            <span className={`px-2 py-1 text-xs font-semibold rounded ${
              priority === 'haute'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {priority.toUpperCase()}
            </span>

            <span className="flex items-center space-x-1">
              <span className={`w-2 h-2 rounded-full ${getStatusColor(status)}`}></span>
              <span className="text-sm text-gray-600 capitalize">
                {status.replace('_', ' ')}
              </span>
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-3">
            Incident détecté sur capteur #{ticket.capteur}
          </p>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Créé le : {formatDate(ticket.created_at)}</span>
            <span>Assigné à : {ticket.assigne_a || 'Non assigné'}</span>
          </div>

          {status !== "clos" && (
            <button
              onClick={handleClose}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
