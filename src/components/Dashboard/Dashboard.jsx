import React, { useEffect, useState } from 'react';
import { fetchMesures, fetchTickets } from "../../services/api";
import TemperatureCard from './TemperatureCard';
import HumidityCard from './HumidityCard';
import QuickStats from './QuickStats';

const Dashboard = () => {
const [mesures, setMesures] = useState([]);
const [tickets, setTickets] = useState([]);
const [currentData, setCurrentData] = useState({
    temperature: null,
    humidity: null,
    lastUpdate: null,
    status: 'normal'
  });

  useEffect(() => {
    const loadData = async () => {
      // 1️⃣ Charger les mesures
      const mesuresData = await fetchMesures();
      setMesures(mesuresData);

      // 2️⃣ Charger les tickets
      const ticketsData = await fetchTickets();
      setTickets(ticketsData);

      // 3️⃣ Mettre à jour la carte principale (dernière mesure)
      if (mesuresData && mesuresData.length > 0) {
        const latest = mesuresData[0];
        setCurrentData({
          temperature: latest.temperature,
          humidity: latest.humidite,
          lastUpdate: latest.timestamp || new Date().toISOString(),
          status:
            latest.temperature < 2 || latest.temperature > 8
              ? "alert"
              : "normal",
        });
      }
    };

    loadData();

    // 🔄 Auto-refresh (20 minutes)
    const interval = setInterval(loadData, 20 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Prepare temperature history for the chart
  const tempHistory = mesures.map(m => ({
    time: m.timestamp || m.date,
    value: m.temperature
  }));

  // Prepare humidity history for the chart
  const humHistory = mesures.map(m => ({
    time: m.timestamp || m.date,
    value: m.humidite
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TemperatureCard 
          temperature={currentData.temperature}
          lastUpdate={currentData.lastUpdate}
          status={currentData.status}
          history={tempHistory}
        />
        <HumidityCard 
          humidity={currentData.humidity}
          lastUpdate={currentData.lastUpdate}
          history={humHistory}
        />
      </div>
      <QuickStats
        mesures={mesures}
        tickets={tickets}
      />

    </div>
  );
};

export default Dashboard;