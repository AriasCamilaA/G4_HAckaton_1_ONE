import { useState } from 'react';

const useUpdateService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateService = async (serviceId, serviceData, bearer) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${serviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearer}`
        },
        body: JSON.stringify(serviceData),
      });
      if (!response.ok) throw new Error('Error updating service');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateService, loading, error };
};

export default useUpdateService;
