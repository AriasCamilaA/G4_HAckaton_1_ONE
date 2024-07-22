import { useState, useEffect } from 'react';
import { adaptService } from '../adapters/serviceAdapter';
import fetchWithAuth from '../auth/useFetchWithAuth';

const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/services/all`);
        const data = await response.json();
        setServices(data.map(adaptService));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};

export default useServices;
