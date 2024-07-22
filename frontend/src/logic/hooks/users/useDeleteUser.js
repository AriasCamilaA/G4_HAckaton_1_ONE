import { useState } from 'react';

const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteUser = async (userId, bearer) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${bearer}`
        },
      });
      if (!response.ok) throw new Error('Error deleting user');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading, error };
};

export default useDeleteUser;
