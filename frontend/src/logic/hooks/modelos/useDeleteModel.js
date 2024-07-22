import { useState } from 'react';

const useDeleteModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteModel = async (modelId, bearer) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/models/${modelId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${bearer}`
        },
      });
      if (!response.ok) throw new Error('Error deleting model');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteModel, loading, error };
};

export default useDeleteModel;
