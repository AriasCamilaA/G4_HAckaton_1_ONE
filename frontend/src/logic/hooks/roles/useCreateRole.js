import { useState } from 'react';
import fetchWithAuth from '../auth/useFetchWithAuth';

const useCreateRole = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRole = async (roleData) => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roleData),
      });
      if (!response.ok) throw new Error('Error creating role');
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { createRole, loading, error };
};

export default useCreateRole;
