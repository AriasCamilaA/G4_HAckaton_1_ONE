import { useState } from 'react';

const useCreateService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createService = async (serviceData, bearer) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearer}`
        },
        body: JSON.stringify(serviceData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating service');
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { createService, loading, error };
};

export default useCreateService;
