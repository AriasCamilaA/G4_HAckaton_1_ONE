import { useState, useEffect } from 'react';
import { adaptRole } from '../adapters/roleAdapter';
import fetchWithAuth from '../auth/useFetchWithAuth';

const useRole = (roleId) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/roles/${roleId}`);
        const data = await response.json();
        setRole(adaptRole(data));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [roleId]);

  return { role, loading, error };
};

export default useRole;
