import { useState } from 'react';

const useCreateKey = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createKey = async (keyData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(keyData),
      });
      if (!response.ok) throw new Error('Error creating key');
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { createKey, loading, error };
};

export default useCreateKey;
