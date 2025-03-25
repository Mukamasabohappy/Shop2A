import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Filter, TrendingUp, Clock, DollarSign, Package, Users, ShoppingBag } from 'lucide-react';
import '../Dahboard/DashStyle/Analytics.css';
// Sample data - replace with your actual data
const salesData = [
  { month: 'Jan', sales: 12000, profit: 3600, customers: 420 },
  { month: 'Feb', sales: 14000, profit: 4200, customers: 490 },
  { month: 'Mar', sales: 16500, profit: 4950, customers: 580 },
  { month: 'Apr', sales: 15800, profit: 4740, customers: 550 },
  { month: 'May', sales: 17300, profit: 5190, customers: 610 },
  { month: 'Jun', sales: 21000, profit: 6300, customers: 740 }
];

const categoryData = [
  { name: 'T-Shirts', value: 32 },
  { name: 'Dresses', value: 24 },
  { name: 'Jeans', value: 18 },
  { name: 'Outerwear', value: 14 },
  { name: 'Accessories', value: 12 }
];

const topProducts = [
  { name: 'Summer Floral Dress', units: 128, revenue: 6400 },
  { name: 'Classic Denim Jeans', units: 116, revenue: 5800 },
  { name: 'Graphic Print T-Shirt', units: 95, revenue: 2850 },
  { name: 'Lightweight Jacket', units: 82, revenue: 6150 },
  { name: 'Casual Cotton Blouse', units: 79, revenue: 3160 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ClothingStoreAnalytics = () => {
  const [timeframe, setTimeframe] = useState('6m');
  
  // Calculate KPIs
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalProfit = salesData.reduce((sum, item) => sum + item.profit, 0);
  const totalCustomers = salesData.reduce((sum, item) => sum + item.customers, 0);
  const avgOrderValue = Math.round(totalSales / totalCustomers * 10) / 10;
  const profitMargin = Math.round((totalProfit / totalSales) * 100);
  
  // Find growth trends
  const growth = {
    sales: Math.round(((salesData[5].sales - salesData[0].sales) / salesData[0].sales) * 100),
    customers: Math.round(((salesData[5].customers - salesData[0].customers) / salesData[0].customers) * 100),
    profit: Math.round(((salesData[5].profit - salesData[0].profit) / salesData[0].profit) * 100)
  };
  
  return (
    <div className="analytics-container">
      <div className="analytics-wrapper">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Clothing Store Analytics</h1>
          <div className="flex items-center justify-between mt-4">
            <p className="text-gray-500 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Last 6 months overview
            </p>
            <div className="flex items-center gap-2">
              <button 
                className={`px-3 py-1 rounded-md ${timeframe === '6m' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setTimeframe('6m')}
              >
                6 Months
              </button>
              <button 
                className={`px-3 py-1 rounded-md ${timeframe === '3m' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setTimeframe('3m')}
              >
                3 Months
              </button>
              <button 
                className={`px-3 py-1 rounded-md ${timeframe === '1m' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setTimeframe('1m')}
              >
                1 Month
              </button>
            </div>
          </div>
        </header>
        
        {/* KPI Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm">Total Sales</h3>
              <DollarSign className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold mt-2">${totalSales.toLocaleString()}</p>
            <div className="flex items-center mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${growth.sales > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {growth.sales > 0 ? '+' : ''}{growth.sales}%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs previous period</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm">Profit</h3>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold mt-2">${totalProfit.toLocaleString()}</p>
            <div className="flex items-center mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${growth.profit > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {growth.profit > 0 ? '+' : ''}{growth.profit}%
              </span>
              <span className="text-xs text-gray-500 ml-2">margin: {profitMargin}%</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm">Customers</h3>
              <Users className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold mt-2">{totalCustomers.toLocaleString()}</p>
            <div className="flex items-center mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${growth.customers > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {growth.customers > 0 ? '+' : ''}{growth.customers}%
              </span>
              <span className="text-xs text-gray-500 ml-2">new shoppers</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm">Avg Order Value</h3>
              <ShoppingBag className="h-5 w-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold mt-2">${avgOrderValue}</p>
            <div className="flex items-center mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                Target: $45
              </span>
              <span className="text-xs text-gray-500 ml-2">per order</span>
            </div>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Trend */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#0088FE" strokeWidth={2} />
                <Line type="monotone" dataKey="profit" stroke="#00C49F" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-medium">Smart Insight:</p>
              <p>Sales show a consistent upward trend with a significant 75% increase over the period. June shows the strongest performance, suggesting seasonal demand.</p>
            </div>
          </div>
          
          {/* Category Distribution */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-medium">Smart Insight:</p>
              <p>T-shirts and dresses account for over 50% of your sales. Consider expanding these popular categories or running promotions on lower-performing categories.</p>
            </div>
          </div>
        </div>
        
        {/* Top Products Table */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units Sold</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.units}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.revenue}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Math.round(product.revenue/product.units)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p className="font-medium">Smart Insight:</p>
            <p>The Lightweight Jacket has the highest average price ($75) with strong sales. Consider stocking similar premium items and bundling with popular lower-priced items like the Graphic Print T-Shirt.</p>
          </div>
        </div>
        
        {/* Strategic Recommendations */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Strategic Recommendations</h2>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-md border-l-4 border-blue-500">
              <h3 className="font-medium text-blue-800">Inventory Management</h3>
              <p className="text-sm text-gray-600 mt-1">Stock up on summer dresses and lightweight jackets for the upcoming season based on the positive sales trend in June.</p>
            </div>
            
            <div className="p-3 bg-green-50 rounded-md border-l-4 border-green-500">
              <h3 className="font-medium text-green-800">Marketing Focus</h3>
              <p className="text-sm text-gray-600 mt-1">Create bundle promotions pairing top-sellers (dresses/jackets) with accessories to increase average order value by at least 15%.</p>
            </div>
            
            <div className="p-3 bg-purple-50 rounded-md border-l-4 border-purple-500">
              <h3 className="font-medium text-purple-800">Customer Retention</h3>
              <p className="text-sm text-gray-600 mt-1">Implement a loyalty program targeting your 610+ customers from May with exclusive previews of new arrivals to maintain the 25% growth rate.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothingStoreAnalytics;