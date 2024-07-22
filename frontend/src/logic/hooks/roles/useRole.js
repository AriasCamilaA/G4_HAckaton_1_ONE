import { useState, useEffect } from 'react';
import { adaptRole } from '../adapters/roleAdapter';

const useRole = (roleId, bearer) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles/${roleId}`, {
          headers: {
            'Authorization': `Bearer ${bearer}`
          }
        });
        const data = await response.json();
        setRole(adaptRole(data));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [roleId, bearer]);

  return { role, loading, error };
};

export default useRole;
