import { useState } from 'react';

const useDeleteKey = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteKey = async (keyId, bearer) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/keys/${keyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${bearer}`
        },
      });
      if (!response.ok) throw new Error('Error deleting key');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteKey, loading, error };
};

export default useDeleteKey;
