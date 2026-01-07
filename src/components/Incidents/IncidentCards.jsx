import React from 'react';
import { formatDate } from '../../utils/helpers';
import {
  AlertTriangle,
  Thermometer,
  Droplets,
  CheckCircle
} from 'lucide-react';

const getSeverityStyle = (severity) => {
  switch (severity?.toLowerCase()) {
    case 'critical':
      return 'bg-red-100 text-red-700 border-red-400';
    case 'high':
      return 'bg-orange-100 text-orange-700 border-orange-400';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700 border-yellow-400';
    default:
      return 'bg-green-100 text-green-700 border-green-400';
  }
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'open':
      return 'bg-red-100 text-red-700';
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-700';
    case 'resolved':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const IncidentCards = ({ incidents = [] }) => {
  if (!incidents.length) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
        Aucun incident détecté
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {incidents.map(incident => (
        <div
          key={incident.id}
          className={`bg-white rounded-xl shadow hover:shadow-lg transition p-5 border-l-4 ${getSeverityStyle(incident.severity)}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="text-red-500" />
              <h4 className="font-semibold text-gray-800">
                Incident #{incident.id}
              </h4>
            </div>

            <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusBadge(incident.status)}`}>
  {(incident.status || 'open').replace('_', ' ')}
</span>

          </div>

          {/* Body */}
          <div className="mt-3 text-sm text-gray-700 space-y-1">
            <p><strong>Type :</strong> {incident.type}</p>

            <p className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-red-500" />
              <span>{incident.temp} °C</span>

              <Droplets className="w-4 h-4 text-blue-500 ml-4" />
              <span>{incident.hum} %</span>
            </p>

            <p>
              <strong>Détecté :</strong> {formatDate(incident.timestamp)}
            </p>

            <p>
              <strong>Assigné à :</strong> {incident.assignedTo || 'Non assigné'}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-4 flex justify-between items-center">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded ${getSeverityStyle(incident.severity)}`}
            >
              {(incident.severity || 'low').toUpperCase()}

            </span>

            <button className="text-sm text-blue-600 hover:underline">
              Voir ticket
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncidentCards;
