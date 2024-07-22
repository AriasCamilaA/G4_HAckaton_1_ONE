import { useState, useEffect } from 'react';
import { adaptRole } from '../adapters/roleAdapter';

const useRoles = (bearer) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles/all`, {
          headers: {
            'Authorization': `Bearer ${bearer}`
          }
        });
        const data = await response.json();
        setRoles(data.map(adaptRole));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [bearer]);

  return { roles, loading, error };
};

export default useRoles;
