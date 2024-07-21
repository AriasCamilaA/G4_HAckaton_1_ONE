import { useState } from 'react';

const useUpdateModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateModel = async (modelId, modelData) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/models/${modelId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modelData),
      });
      if (!response.ok) throw new Error('Error updating model');
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { updateModel, loading, error };
};

export default useUpdateModel;