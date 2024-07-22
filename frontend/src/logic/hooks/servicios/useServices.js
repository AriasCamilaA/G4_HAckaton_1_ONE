import { useState, useEffect } from 'react';
import { adaptService } from '../adapters/serviceAdapter';

const useServices = (bearer) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/all`, {
          headers: {
            'Authorization': `Bearer ${bearer}`
          }
        });
        const data = await response.json();
        setServices(data.map(adaptService));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [bearer]);

  return { services, loading, error };
};

export default useServices;
