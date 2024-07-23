import { useState, useEffect } from 'react';
// import { adaptModel } from '../adapters/modelAdapter';

const useModels = (bearer) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/models/all`, {
          headers: {
            'Authorization': `Bearer ${bearer}`
          }
        });
        const data = await response.json();
        setModels(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [bearer]);

  return { models, loading, error };
};

export default useModels;
