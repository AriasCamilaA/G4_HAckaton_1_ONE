import { useState } from 'react';

const useFetchWithAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWithAuth = async (url, options = {}) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error during fetch');
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { fetchWithAuth, loading, error };
};

export default useFetchWithAuth;
