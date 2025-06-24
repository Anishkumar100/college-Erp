import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const FeeDonutChart = () => {
  // ❌ Static mock data — remove this later
  const paid = 82;
  const due = 18;

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // ✅ Replace this entire block with API fetch
    const data = {
      labels: ['Paid (%)', 'Due (%)'],
      datasets: [
        {
          label: 'Fee Collection',
          data: [paid, due], // ❌ Replace with API response values
          backgroundColor: ['#10b981', '#ef4444'],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#9ca3af',
            font: {
              size: 14,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${ctx.raw}%`,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);

    /*
    ✅ When using API:
    const fetchFeeStats = async () => {
      try {
        const res = await fetch('/api/fees'); // Example endpoint
        const { paid, due } = await res.json();

        const data = {
          labels: ['Paid (%)', 'Due (%)'],
          datasets: [
            {
              label: 'Fee Collection',
              data: [paid, due],
              backgroundColor: ['#10b981', '#ef4444'],
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
        setChartOptions(options);
      } catch (err) {
        console.error('Error fetching fee data:', err);
      }
    };

    fetchFeeStats();
    */
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Fee Collection</h3>

      <div className="h-[400px]">
        {/* ✅ Prevents error if chartData is undefined */}
        {chartData?.datasets ? (
          <Doughnut data={chartData} options={chartOptions} />
        ) : (
          <p className="text-center text-red-500">Loading chart...</p>
        )}
      </div>
    </div>
  );
};
