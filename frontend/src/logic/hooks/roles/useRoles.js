import { useState, useEffect } from 'react';
import { adaptRole } from '../adapters/roleAdapter';

const useRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('/api/roles');
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
