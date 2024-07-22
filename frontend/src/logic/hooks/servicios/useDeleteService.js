import { useState } from 'react';
import fetchWithAuth from '../auth/useFetchWithAuth';

const useDeleteService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteService = async (serviceId) => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/services/${serviceId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error deleting service');
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { deleteService, loading, error };
};

export default useDeleteService;
