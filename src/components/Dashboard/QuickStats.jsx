import React from "react";

const QuickStats = ({ mesures = [], tickets = [] }) => {
  // Incidents = mesures hors seuil
  const incidents = mesures.filter(
    m => m.temperature < 2 || m.temperature > 8
  );

  const stats = [
    {
      label: "Incidents ouverts",
      value: incidents.length,
      color: "text-red-600",
    },
    {
      label: "Tickets ouverts",
      value: tickets.filter(t => t.statut === "ouvert").length,
      color: "text-yellow-600",
    },
    {
      label: "Tickets en cours",
      value: tickets.filter(t => t.statut === "en_cours").length,
      color: "text-blue-600",
    },
    {
      label: "Tickets clos",
      value: tickets.filter(t => t.statut === "clos").length,
      color: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 text-sm">{stat.label}</p>
          <p className={`text-2xl font-bold ${stat.color}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
