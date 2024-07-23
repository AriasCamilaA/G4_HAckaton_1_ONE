import { useState, useEffect } from 'react';

const useServicesWithKeys = (bearer) => {
  const [servicesWithKeys, setServicesWithKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/all`, {
          headers: {
            'Authorization': `Bearer ${bearer}`
          }
        });
        const services = await servicesResponse.json();
        const servicesWithKeysPromises = services.map(async (service) => {
          const keysResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/keys/service/${service.id}`, {
            headers: {
              'Authorization': `Bearer ${bearer}`
            }
          });
          const keys = await keysResponse.json();
          return { ...service, keys };
        });
        const servicesWithKeys = await Promise.all(servicesWithKeysPromises);
        setServicesWithKeys(servicesWithKeys);
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

  return { servicesWithKeys, loading, error };
};

export default useServicesWithKeys;
