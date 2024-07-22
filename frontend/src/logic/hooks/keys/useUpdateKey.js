import { useState } from 'react';

const useUpdateKey = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateKey = async (keyId, keyData, bearer) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/keys/${keyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearer}`
        },
        body: JSON.stringify(keyData),
      });
      if (!response.ok) throw new Error('Error updating key');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateKey, loading, error };
};

export default useUpdateKey;
