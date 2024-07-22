import React from 'react';
import Dashboard from '../../components/Dashboard';
import NavSesion from '../../components/NavSesion';

export default function Home() {
    return (
        <div>
            <NavSesion />
            <Dashboard />
        </div>
    );
}