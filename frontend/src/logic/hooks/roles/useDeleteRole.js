import { useState } from 'react';
import fetchWithAuth from '../auth/useFetchWithAuth';

const useDeleteRole = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteRole = async (roleId) => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/roles/${roleId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error deleting role');
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { deleteRole, loading, error };
};

export default useDeleteRole;
