import React from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';
import '../Dahboard/DashStyle/Dashboard.css'; // Import the CSS file

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

const Dashboard = () => {
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Revenue Trend' },
    },
  };

  const categoryData = {
    labels: ['Shirts', 'Pants', 'Dresses', 'Accessories'],
    datasets: [
      {
        label: 'Revenue',
        data: [20000, 15000, 25000, 10000],
        backgroundColor: ['red', 'blue', 'yellow', 'green'],
      },
    ],
  };

  const channelData = {
    labels: ['Online', 'In-Store'],
    datasets: [
      {
        label: 'Revenue',
        data: [70, 30],
        backgroundColor: ['purple', 'orange'],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Clothing Shop - Business Performance Overview</h1>
      </header>

      <section className="chart-section">
        <div className="chart-container" id="revenue-trend">
          <h2>Revenue Trend Over Time</h2>
          <Line options={revenueOptions} data={revenueData} />
        </div>

        <div className="chart-container" id="revenue-by-category">
          <h2>Revenue by Product Category</h2>
          <Bar data={categoryData} />
        </div>

        <div className="chart-container" id="revenue-by-channel">
          <h2>Revenue by Sales Channel</h2>
          <Doughnut data={channelData} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
