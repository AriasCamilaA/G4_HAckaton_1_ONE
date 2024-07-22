import { useState } from 'react';
import fetchWithAuth from '../auth/useFetchWithAuth';

const useUpdateKey = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateKey = async (keyId, keyData) => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/keys/${keyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(keyData),
      });
      if (!response.ok) throw new Error('Error updating key');
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { updateKey, loading, error };
};

export default useUpdateKey;
