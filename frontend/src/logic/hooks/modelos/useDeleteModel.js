import { useState } from 'react';

const useDeleteModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteModel = async (modelId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/models/${modelId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error deleting model');
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { deleteModel, loading, error };
};

export default useDeleteModel;