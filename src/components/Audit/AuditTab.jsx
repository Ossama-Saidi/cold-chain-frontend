import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
// import AuditTable from './AuditTable';
import AuditCards from './AuditCards';
import { exportCSV } from '../../utils/helpers';
import { fetchAuditLogs } from '../../services/api';

const AuditTab = () => {
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    fetchAuditLogs().then(setAuditLogs);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Audit Log</h2>

        <button
          onClick={() => exportCSV(auditLogs, 'audit_log.csv')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <AuditCards auditLogs={auditLogs} />
    </div>
  );
};

export default AuditTab;
