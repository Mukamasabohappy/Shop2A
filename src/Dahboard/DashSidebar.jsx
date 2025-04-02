import React from "react";
import { NavLink } from "react-router-dom";
import "../Dahboard/DashStyle/DashSidebar.css"; // Ensure this path is correct

const Sidebar = () => {
    return (
        <aside className="dashboard-sidebar">
            {/* Sidebar Logo */}
            <div className="sidebar-logo">
                <NavLink to="/">
                    <img src="/path-to-your-logo.png" alt="Shop Logo" className="SHOP" />
                </NavLink>
            </div>

            {/* Navigation Menu */}
            <nav>
                <ul className="sidebar-nav-list">
                    <li className="sidebar-nav-item">
                        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active sidebar-nav-link" : "sidebar-nav-link")}>
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="sidebar-nav-item">
                        <NavLink to="/dashboard/inventory" className={({ isActive }) => (isActive ? "active sidebar-nav-link" : "sidebar-nav-link")}>
                            Inventory
                        </NavLink>
                    </li>
                    <li className="sidebar-nav-item">
                        <NavLink to="/dashboard/orders" className={({ isActive }) => (isActive ? "active sidebar-nav-link" : "sidebar-nav-link")}>
                            Orders
                        </NavLink>
                    </li>
                    <li className="sidebar-nav-item">
                        <NavLink to="/dashboard/customer" className={({ isActive }) => (isActive ? "active sidebar-nav-link" : "sidebar-nav-link")}>
                            Customers
                        </NavLink>
                    </li>
                    <li className="sidebar-nav-item">
                        <NavLink to="/dashboard/analytics" className={({ isActive }) => (isActive ? "active sidebar-nav-link" : "sidebar-nav-link")}>
                            Reports & Analytics
                        </NavLink>
                    </li>
                    <li className="sidebar-nav-item">
                        <NavLink to="/dashboard/settings" className={({ isActive }) => (isActive ? "active sidebar-nav-link" : "sidebar-nav-link")}>
                            Settings
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
