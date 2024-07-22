import { useState } from 'react';

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (userId, userData, bearer) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearer}`
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error updating user');
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};

export default useUpdateUser;
