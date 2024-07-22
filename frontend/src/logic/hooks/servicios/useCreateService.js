import { useState } from 'react';
import fetchWithAuth from '../auth/useFetchWithAuth';

const useCreateService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createService = async (serviceData) => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData),
      });
      if (!response.ok) throw new Error('Error creating service');
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { createService, loading, error };
};

export default useCreateService;
