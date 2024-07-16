import { useState, useEffect } from 'react';
import { adaptModel } from '../adapters/modelAdapter';

const useModels = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('/api/models');
        const data = await response.json();
        setModels(data.map(adaptModel));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  return { models, loading, error };
};

export default useModels;
