import { useState, useEffect } from 'react';
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
        if (!response.ok) {
          throw new Error(`Error fetching services: ${response.statusText}`);
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (bearer) {
      fetchServices();
    } else {
      setLoading(false);
    }
  }, [bearer]);

  return { services, loading, error };
};

export default useServices;
