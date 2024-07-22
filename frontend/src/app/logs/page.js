import React from 'react';
import Tracing from '../../components/TableLogs';
import NavSesion from '../../components/NavSesion';

export default function logs() {
    return (
        <div>
            <NavSesion />
            <Tracing />
        </div>
    );
}
