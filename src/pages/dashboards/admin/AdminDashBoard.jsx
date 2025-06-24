import React, { useState } from 'react';
import { AdmissionLineChart, Header, FeeDonutChart, AdminCalendar } from '../../../components/indexComponents';

export const AdminDashBoard = () => {
  // 🔹 MOCKED DASHBOARD STATS — Replace with API data later
  const [stats] = useState({
    students: 1243,
    faculty: 102,
    departments: 10,
    programs: 18,
    admissions: 420,
    feeDue: 18,         // 🎯 Pass this to FeeDonutChart when dynamic
    attendance: 92,
  });

  return (
    <>
      {/* 🔹 Display logged-in user's role */}
      <Header userRole={JSON.parse(localStorage.getItem('userRole'))} />

      <div className="p-4 space-y-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-300">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>

        {/* 🔹 Quick Stats Cards — Replace hardcoded data with API call */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Students', value: stats.students, icon: 'pi-users', color: 'bg-blue-600' },
            { label: 'Faculty', value: stats.faculty, icon: 'pi-user', color: 'bg-green-600' },
            { label: 'Departments', value: stats.departments, icon: 'pi-sitemap', color: 'bg-violet-600' },
            { label: 'Programs', value: stats.programs, icon: 'pi-briefcase', color: 'bg-pink-600' },
          ].map((stat, i) => (
            <div key={i} className={`rounded-lg shadow-md p-4 flex items-center gap-4 ${stat.color}`}>
              <i className={`pi ${stat.icon} text-3xl text-white`} />
              <div>
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/80">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 Additional Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'New Admissions (YTD)', value: stats.admissions, icon: 'pi-user-plus', color: 'bg-cyan-600' },
            { label: 'Fee Due %', value: `${stats.feeDue}%`, icon: 'pi-credit-card', color: 'bg-red-600' },
            { label: 'Avg Attendance', value: `${stats.attendance}%`, icon: 'pi-calendar-times', color: 'bg-yellow-600' },
          ].map((stat, i) => (
            <div key={i} className={`rounded-lg shadow-md p-4 flex items-center gap-4 ${stat.color}`}>
              <i className={`pi ${stat.icon} text-3xl text-white`} />
              <div>
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/80">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 dark:bg-gray-800 rounded-lg shadow-md p-4">
            {/* ⛳ LINE CHART — Currently using mock generator inside AdmissionLineChart */}
            <AdmissionLineChart />
          </div>

          <div className="dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-3">Fee Collection</h3>
            <div className="w-full bg-gray-700 rounded-lg flex items-center justify-center text-sm text-white/60">
              {/* ⛳ DOUGHNUT CHART — Replace internal mock with prop later (optional) */}
              <FeeDonutChart />
              {/*
                ✅ Optional: Pass dynamic values
                <FeeDonutChart paid={100 - stats.feeDue} due={stats.feeDue} />
              */}
            </div>
          </div>
        </div>

        {/* 🔹 Calendar & Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-3 dark:text-white">Upcoming Events</h3>
            <ul className="space-y-2 text-sm">
              {/* ✅ You can dynamically fetch these events in future */}
              <li className="text-blue-500 dark:text-blue-400">📅 Admission Interview - June 25</li>
              <li className="text-green-600 dark:text-green-400">🎓 Semester Begins - July 01</li>
              <li className="text-yellow-600 dark:text-yellow-400">💰 Fee Due Date - July 15</li>
            </ul>
          </div>

          <div className="lg:col-span-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-3 dark:text-white">Academic Calendar</h3>

           
              <AdminCalendar />
            

          </div>
        </div>

        {/* 🔹 Notifications */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-3 dark:text-white">Recent Notifications</h3>
          <ul className="space-y-2 text-sm text-gray-800 dark:text-white">
            {/* 🔁 Replace with dynamic notifications in the future */}
            <li className="border-b border-gray-300 dark:border-gray-700 pb-2">📩 New application received from Anish Kumar.</li>
            <li className="border-b border-gray-300 dark:border-gray-700 pb-2">💰 Payment received from roll no. 220081602021.</li>
            <li>🕒 Faculty attendance updated for June 23.</li>
          </ul>
        </div>
      </div>
    </>
  );
};
