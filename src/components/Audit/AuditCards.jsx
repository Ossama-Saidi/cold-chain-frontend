import React from 'react';
import { formatDate } from '../../utils/helpers';
import {
  CheckCircle,
  Edit,
  Trash2,
  LogIn,
  ShieldAlert
} from 'lucide-react';

const getActionStyle = (action) => {
  const a = action?.toLowerCase() || '';

  if (a.includes('create'))
    return { color: 'text-green-600', bg: 'bg-green-100', icon: <CheckCircle /> };

  if (a.includes('update'))
    return { color: 'text-blue-600', bg: 'bg-blue-100', icon: <Edit /> };

  if (a.includes('delete'))
    return { color: 'text-red-600', bg: 'bg-red-100', icon: <Trash2 /> };

  if (a.includes('login') || a.includes('logout'))
    return { color: 'text-purple-600', bg: 'bg-purple-100', icon: <LogIn /> };

  return { color: 'text-gray-600', bg: 'bg-gray-100', icon: <ShieldAlert /> };
};

const AuditCards = ({ auditLogs = [] }) => {
  if (!auditLogs.length) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
        Aucun audit disponible
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {auditLogs.map(log => {
        const style = getActionStyle(log.action);

        return (
          <div
            key={log.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 border-l-4 border-gray-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${style.bg} ${style.color}`}>
                  {style.icon}
                </div>
                <div>
                  <h4 className={`font-semibold ${style.color}`}>
                    {log.action}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {formatDate(log.timestamp)}
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-400">#{log.id}</span>
            </div>

            <div className="mt-3 text-sm text-gray-700">
              <strong>Utilisateur :</strong> {log.user || 'System'}
            </div>

            <div className="mt-1 text-sm text-gray-600">
              <strong>Détails :</strong> {log.objet}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AuditCards;
