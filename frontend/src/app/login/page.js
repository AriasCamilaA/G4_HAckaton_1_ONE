
import React from 'react';
import Login from '../../components/Login';
import AddKey from '../../components/AddKey';
import TableKey from '../../components/TableKey';

export default function Home() {
    return (
        <div className="bg-white">
            <Login />
            <AddKey />
            <TableKey />
        </div>
    );
}
