"use client";
import React, { useEffect } from 'react';
import Registration from '../../components/Registration';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {
    const { user } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (user) {
        router.push('/Dashboard');
      }
    }, [user, router]);
  
    if (user) {
      return <div>Loading...</div>;
    }
    return (
        <div className="bg-white">
            <Registration />
        </div>
    );
}
