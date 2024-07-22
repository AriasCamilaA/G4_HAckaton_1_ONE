"use client";

import React, { useEffect } from 'react';
import Login from '../../components/Login';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
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
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
