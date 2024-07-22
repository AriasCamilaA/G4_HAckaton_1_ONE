import { useState } from 'react';
import fetchWithAuth from '../auth/useFetchWithAuth';

const useDeleteKey = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteKey = async (keyId) => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/keys/${keyId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error deleting key');
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { deleteKey, loading, error };
};

export default useDeleteKey;
