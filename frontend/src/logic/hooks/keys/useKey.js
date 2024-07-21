import { useState, useEffect } from 'react';
import { adaptKey } from '../adapters/keyAdapter';

const useKey = (keyId) => {
  const [key, setKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/keys/${keyId}`);
        const data = await response.json();
        setKey(adaptKey(data));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchKey();
  }, [keyId]);

  return { key, loading, error };
};

export default useKey;
