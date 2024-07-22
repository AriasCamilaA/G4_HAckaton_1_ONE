import { useState, useEffect } from 'react';
import { adaptRole } from '../adapters/roleAdapter';
import fetchWithAuth from '../auth/useFetchWithAuth';

const useRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/roles/all`);
        const data = await response.json();
        setRoles(data.map(adaptRole));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return { roles, loading, error };
};

export default useRoles;
