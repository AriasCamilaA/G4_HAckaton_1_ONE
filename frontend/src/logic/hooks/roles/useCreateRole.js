import { useState } from 'react';

const useCreateRole = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRole = async (roleData, bearer) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearer}`
        },
        body: JSON.stringify(roleData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating role');
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { createRole, loading, error };
};

export default useCreateRole;
