import { useState } from 'react';

const useCreateModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createModel = async (modelData, bearer) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/models`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearer}`
        },
        body: JSON.stringify(modelData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating model');
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { createModel, loading, error };
};

export default useCreateModel;
