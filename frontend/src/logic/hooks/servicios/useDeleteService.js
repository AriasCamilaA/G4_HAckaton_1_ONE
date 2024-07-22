import { useState } from 'react';

const useDeleteService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteService = async (serviceId, bearer) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${bearer}`
        },
      });
      if (!response.ok) throw new Error('Error deleting service');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteService, loading, error };
};

export default useDeleteService;
