import React, { useState } from 'react';
import { Thermometer, TrendingUp, X } from 'lucide-react';
import Chart from './Chart';
import { formatDate } from '../../utils/helpers';

const TemperatureCard = ({ temperature, lastUpdate, status, history }) => {
  const [showChart, setShowChart] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-full ${status === 'alert' ? 'bg-red-100' : 'bg-red-50'}`}>
            <Thermometer className={`w-6 h-6 ${status === 'alert' ? 'text-red-600' : 'text-red-500'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Temperature</h3>
            <p className="text-xs text-gray-500">Target: 2-8°C</p>
          </div>
        </div>
        <button
          onClick={() => setShowChart(!showChart)}
          className="p-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
        >
          <TrendingUp className="w-5 h-5 text-red-600" />
        </button>
      </div>
      
      <div className="mb-4">
        <p className="text-4xl font-bold text-gray-800">{temperature}°C</p>
        <p className="text-sm text-gray-500 mt-1">
          Last update: {formatDate(lastUpdate)}
        </p>
      </div>

      {showChart && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-700">Temperature History</h4>
            <button onClick={() => setShowChart(false)}>
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <Chart 
            data={history} 
            dataKey="value" 
            color="#dc2626" 
            yDomain={[0, 10]}
            label="Temp (°C)"
          />
        </div>
      )}
    </div>
  );
};

export default TemperatureCard;