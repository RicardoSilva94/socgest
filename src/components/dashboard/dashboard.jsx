import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar content */}
                    </div>
                </div>
                <div className="col-md-9">
                    {/* Main content */}
                    <div className="main-content">
                        {/* Dashboard content */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;