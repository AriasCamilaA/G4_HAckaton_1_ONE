import { useState, useEffect } from 'react';
import { adaptKey } from '../../adapters/keyAdapter';

const useKeys = (bearer) => {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/keys/all`, {
          headers: {
            'Authorization': `Bearer ${bearer}`
          }
        });
        if (!response.ok) {
          throw new Error(`Error fetching keys: ${response.statusText}`);
        }
        const data = await response.json();
        setKeys(data);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (bearer) {
      fetchKeys();
    } else {
      setLoading(false);
    }
  }, [bearer]);

  return { keys, loading, error };
};

export default useKeys;
