import { useState, useEffect } from 'react';
import { adaptModel } from '../adapters/modelAdapter';
import fetchWithAuth from '../auth/useFetchWithAuth';

const useModel = (modelId) => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/models/${modelId}`);
        const data = await response.json();
        setModel(adaptModel(data));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModel();
  }, [modelId]);

  return { model, loading, error };
};

export default useModel;
