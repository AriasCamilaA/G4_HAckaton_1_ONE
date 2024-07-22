import { useState, useEffect } from 'react';
import { adaptKey } from '../adapters/keyAdapter';
import fetchWithAuth from '../auth/useFetchWithAuth';

const useKeys = () => {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/keys/all`);
        const data = await response.json();
        setKeys(data.map(adaptKey));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchKeys();
  }, []);

  return { keys, loading, error };
};

export default useKeys;
