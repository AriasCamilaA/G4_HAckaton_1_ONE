import { useState } from 'react';

const useCreateModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createModel = async (modelData) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/models`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modelData),
      });
      if (!response.ok) throw new Error('Error creating model');
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { createModel, loading, error };
};

export default useCreateModel;
