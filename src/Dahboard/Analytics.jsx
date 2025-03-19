import React, { useState } from 'react';
import styles from '../Dahboard/DashStyle/Analytics.module.css'; // Correct import for CSS modules

const Analytics = () => {
    // Simulating some sales data
    const salesData = [
        { id: 1, date: '2025-03-10', product: 'Product A', quantity: 5, amount: 100, customer: 'Customer 1' },
        { id: 2, date: '2025-03-12', product: 'Product B', quantity: 3, amount: 60, customer: 'Customer 2' },
        { id: 3, date: '2025-03-14', product: 'Product C', quantity: 8, amount: 160, customer: 'Customer 3' },
        // Add more sample data as needed
    ];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredSalesData, setFilteredSalesData] = useState(salesData); // Using the sample data here

    const handleDateChange = (event, type) => {
        if (type === 'start') {
            setStartDate(event.target.value);
        } else {
            setEndDate(event.target.value);
        }
    };

    const handleFilter = () => {
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        const filteredData = salesData.filter(sale => {
            const saleDate = new Date(sale.date);
            return saleDate >= start && saleDate <= end;
        });

        setFilteredSalesData(filteredData);
    };

    const totalRevenue = filteredSalesData.reduce((sum, sale) => sum + sale.amount, 0);
    const averageOrderValue = filteredSalesData.length > 0 ? totalRevenue / filteredSalesData.length : 0;

    return (
        <div className={styles.analyticsContainer}>
            <h2>Sales Reports & Analytics</h2>

            <div className={styles.dateFilters}>
                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={(e) => handleDateChange(e, 'start')} />

                <label>End Date:</label>
                <input type="date" value={endDate} onChange={(e) => handleDateChange(e, 'end')} />

                <button onClick={handleFilter}>Apply Filters</button>
            </div>

            <div className={styles.summaryMetrics}>
                <div className={styles.metricCard}>
                    <h3>Total Revenue</h3>
                    <p>${totalRevenue.toFixed(2)}</p>
                </div>
                <div className={styles.metricCard}>
                    <h3>Average Order Value</h3>
                    <p>${averageOrderValue.toFixed(2)}</p>
                </div>
            </div>

            {/* Table instead of Chart */}
            <div className={styles.detailedReport}>
                <h3>Detailed Sales Report</h3>
                <table className={styles.salesTable}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Customer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalesData.map(sale => (
                            <tr key={sale.id}>
                                <td>{new Date(sale.date).toLocaleDateString()}</td>
                                <td>{sale.product}</td>
                                <td>{sale.quantity}</td>
                                <td>${sale.amount.toFixed(2)}</td>
                                <td>{sale.customer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Analytics;
