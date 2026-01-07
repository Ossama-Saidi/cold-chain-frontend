import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
// import IncidentTable from './IncidentTable';
import IncidentCards from './IncidentCards';
import { exportCSV } from '../../utils/helpers';
import { fetchIncidents } from '../../services/api';

const IncidentsTab = () => {
    const [incidents, setIncidents] = useState([]);
      const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadIncidents = async () => {
          const data = await fetchIncidents();
          setIncidents(data);
          setLoading(false);
        };

        loadIncidents();
      }, []);

      if (loading) {
        return <p className="text-gray-500">Loading incidents...</p>;
      }

 return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Incident History</h2>
        <button
          onClick={() => exportCSV(incidents, 'incidents.csv')}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      <IncidentCards incidents={incidents} />
    </div>
  );
};

export default IncidentsTab;