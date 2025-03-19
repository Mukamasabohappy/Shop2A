import React, { useState, useEffect } from 'react';
import styles from '../Dahboard/DashStyle/Customer.module.css'; // Create Customers.module.css
import axios from 'axios';

const Customers = () => {
    const [customersData, setCustomersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState('id'); // Default sorting
    const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order

    // useEffect(() => {
    //     const fetchCustomers = async () => {
    //         setLoading(true); // Start loading
    //         setError(null);  // Clear any previous errors
    //         try {
    //             const response = await axios.get('http://localhost:5000/api/customers'); // Replace with your API endpoint
    //             setCustomersData(response.data);
    //         } catch (err) {
    //             console.error("Error fetching customers:", err);
    //             setError("Failed to load customer data. Please try again later.");
    //         } finally {
    //             setLoading(false); // End loading
    //         }
    //     };

    //     fetchCustomers();
    // }, []);

    // const handleSearch = (e) => {
    //     setSearchTerm(e.target.value);
    // };

    // const handleSort = (column) => {
    //     if (sortColumn === column) {
    //         // Toggle sort order if clicking the same column
    //         setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    //     } else {
    //         // Set new column and default to ascending order
    //         setSortColumn(column);
    //         setSortOrder('asc');
    //     }
    // };

    // Filtered and Sorted Customers
    const filteredCustomers = customersData.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
        let comparison = 0;
        if (a[sortColumn] > b[sortColumn]) {
            comparison = 1;
        } else if (a[sortColumn] < b[sortColumn]) {
            comparison = -1;
        }
        return sortOrder === 'asc' ? comparison : comparison * -1;
    });


    if (loading) {
        return <div className={styles.loading}>Loading customer data...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.customersContainer}>
            <h2>Customer List</h2>

            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <table className={styles.customersTable}>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('id')}>ID</th>
                        <th onClick={() => handleSort('name')}>Name</th>
                        <th onClick={() => handleSort('email')}>Email</th>
                        <th onClick={() => handleSort('orders')}>Orders</th>
                        <th onClick={() => handleSort('location')}>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map(customer => (
                        <tr key={customer.id}>
                            <td data-label="ID">{customer.id}</td>
                            <td data-label="Name">{customer.name}</td>
                            <td data-label="Email">{customer.email}</td>
                            <td data-label="Orders">{customer.orders}</td>
                            <td data-label="Location">{customer.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Customers;