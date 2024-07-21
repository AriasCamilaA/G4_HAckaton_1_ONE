import React from 'react';
import Dashboard from '../../components/Dashboard';
import NavSesion from '../../components/NavSesion';

export default function Home() {
    return (
        <div className="bg-white">
            <NavSesion />
            <Dashboard />
        </div>
    );
}