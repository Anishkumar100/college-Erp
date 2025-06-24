import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import dayjs from 'dayjs';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

// ✅ You can keep this for UI buttons
const timeOptions = [
  { label: '1D', days: 1 },
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
];

// ❌ REMOVE THIS FUNCTION when switching to backend API
// ✅ Backend should return the same format: [{ date, count }]
const generateAdmissionData = (days) => {
  const data = [];
  const count = days;

  for (let i = count - 1; i >= 0; i--) {
    const date = dayjs().subtract(i, 'day');
    const label = date.format('MMM D, YYYY');
    const admissionCount = Math.floor(Math.random() * 50) + 10;
    data.push({ date: label, count: admissionCount });
  }

  return data;
};

export const AdmissionLineChart = () => {
  const [days, setDays] = useState(7);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // ❌ Current mock implementation — REMOVE this block when using backend
    const data = generateAdmissionData(days);
    const labels = data.map((d) => d.date);
    const counts = data.map((d) => d.count);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Admissions Count',
          data: counts,
          borderColor: '#4f46e5', // indigo-600
          backgroundColor: 'rgba(99, 102, 241, 0.2)', // indigo-500/20
          fill: true,
          tension: 0.4,
          pointRadius: 2,
        },
      ],
    });

    // ✅ Instead, add this:
    /*
    const fetchAdmissions = async () => {
      try {
        const res = await fetch(`/api/admissions?days=${days}`);
        const json = await res.json();
        const labels = json.map((item) => item.date);
        const counts = json.map((item) => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Admissions Count',
              data: counts,
              borderColor: '#4f46e5',
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
              fill: true,
              tension: 0.4,
              pointRadius: 2,
            },
          ],
        });
      } catch (err) {
        console.error('Error fetching admissions:', err);
      }
    };

    fetchAdmissions();
    */
  }, [days]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#9ca3af',
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `Admissions: ${ctx.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(156, 163, 175, 0.2)' },
      },
      y: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(156, 163, 175, 0.2)' },
      },
    },
  };

  return (
    <div className="w-full p-6 rounded-lg bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <h3 className="text-lg font-semibold mb-4">Admission Trends</h3>

      {/* ✅ Chart will render only if data is present */}
      {chartData?.datasets?.length && chartData?.labels?.length ? (
        <div className="h-[400px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p className="text-center text-red-500">Chart not available.</p>
      )}

      {/* ✅ UI Buttons to control time range */}
      <div className="flex flex-wrap gap-2 mt-6 justify-center">
        {timeOptions.map((opt) => (
          <button
            key={opt.label}
            onClick={() => setDays(opt.days)}
            className={`px-4 py-2 rounded text-sm transition-all ${days === opt.days
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
