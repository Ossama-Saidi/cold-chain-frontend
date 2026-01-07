import React from 'react';
import { formatDate, getSeverityColor, getStatusColor } from '../../utils/helpers';

const IncidentTable = ({ incidents = [] }) => {
  if (!Array.isArray(incidents) || incidents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 text-gray-500 text-center">
        Aucun incident trouvé
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Severity</th>
            <th>Values</th>
            <th>Timestamp</th>
            <th>Status</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map(incident => (
            <tr key={incident.id}>
              <td>#{incident.id}</td>
              <td>{incident.type}</td>
              <td>{incident.severity}</td>
              <td>{incident.temp}°C / {incident.hum}%</td>
              <td>{formatDate(incident.timestamp)}</td>
              <td>{incident.status}</td>
              <td>{incident.assignedTo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default IncidentTable;