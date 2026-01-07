import React from 'react';
import { formatDate } from '../../utils/helpers';

const AuditTable = ({ auditLogs = [] }) => {
  if (auditLogs.length === 0) {
    return (
      <div className="bg-white p-4 rounded shadow text-gray-500">
        Aucun audit disponible
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th>ID</th>
            <th>Action</th>
            <th>User</th>
            <th>Date</th>
            <th>Détails</th>
          </tr>
        </thead>
        <tbody>
          {auditLogs.map(log => (
            <tr key={log.id}>
              <td>#{log.id}</td>
              <td>{log.action}</td>
              <td>{log.user || 'System'}</td>
              <td>{formatDate(log.timestamp)}</td>
              <td>{log.objet}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditTable;
