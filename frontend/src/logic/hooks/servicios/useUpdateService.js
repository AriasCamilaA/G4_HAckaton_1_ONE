import { useState } from 'react';
import fetchWithAuth from '../auth/useFetchWithAuth';

const useUpdateService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateService = async (serviceId, serviceData) => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/services/${serviceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData),
      });
      if (!response.ok) throw new Error('Error updating service');
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { updateService, loading, error };
};

export default useUpdateService;
