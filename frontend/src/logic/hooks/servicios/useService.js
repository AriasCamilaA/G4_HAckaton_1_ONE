import { useState, useEffect } from 'react';
import { adaptService } from '../adapters/serviceAdapter';

const useService = (serviceId) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${serviceId}`);
        const data = await response.json();
        setService(adaptService(data));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  return { service, loading, error };
};

export default useService;
