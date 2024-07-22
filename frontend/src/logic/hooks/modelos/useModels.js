import { useState } from 'react';

const useUpdateModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateModel = async (modelId, modelData, bearer) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/models/${modelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearer}`
        },
        body: JSON.stringify(modelData),
      });
      if (!response.ok) throw new Error('Error updating model');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateModel, loading, error };
};

export default useUpdateModel;
