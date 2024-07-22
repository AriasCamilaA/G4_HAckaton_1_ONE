import { useState, useEffect } from 'react';
import { adaptModel } from '../adapters/modelAdapter';

const useModel = (modelId, bearer) => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/models/${modelId}`, {
          headers: {
            'Authorization': `Bearer ${bearer}`
          }
        });
        const data = await response.json();
        setModel(adaptModel(data));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModel();
  }, [modelId, bearer]);

  return { model, loading, error };
};

export default useModel;
