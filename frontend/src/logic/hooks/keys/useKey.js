import { useState, useEffect } from 'react';
import { adaptKey } from '../adapters/keyAdapter';

const useKey = (keyId, bearer) => {
  const [key, setKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/keys/${keyId}`, {
          headers: {
            'Authorization': `Bearer ${bearer}`
          }
        });
        const data = await response.json();
        setKey(adaptKey(data));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchKey();
  }, [keyId, bearer]);

  return { key, loading, error };
};

export default useKey;
