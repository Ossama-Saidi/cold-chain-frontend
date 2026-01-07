import React, { useState } from 'react';
import { Droplets, TrendingUp, X } from 'lucide-react';
import Chart from './Chart';
import { formatDate } from '../../utils/helpers';

const HumidityCard = ({ humidity, lastUpdate, history }) => {
  const [showChart, setShowChart] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-full bg-teal-100">
            <Droplets className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Humidity</h3>
            <p className="text-xs text-gray-500">Target: 60-70%</p>
          </div>
        </div>
        <button
          onClick={() => setShowChart(!showChart)}
          className="p-2 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
        >
          <TrendingUp className="w-5 h-5 text-teal-600" />
        </button>
      </div>
      
      <div className="mb-4">
        <p className="text-4xl font-bold text-gray-800">{humidity}%</p>
        <p className="text-sm text-gray-500 mt-1">
          Last update: {formatDate(lastUpdate)}
        </p>
      </div>

      {showChart && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-700">Humidity History</h4>
            <button onClick={() => setShowChart(false)}>
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <Chart 
            data={history} 
            dataKey="value" 
            color="#14b8a6" 
            yDomain={[50, 80]}
            label="Humidity (%)"
          />
        </div>
      )}
    </div>
  );
};

export default HumidityCard;