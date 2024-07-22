import { useState } from 'react';

const useDeleteRole = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteRole = async (roleId, bearer) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles/${roleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${bearer}`
        },
      });
      if (!response.ok) throw new Error('Error deleting role');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteRole, loading, error };
};

export default useDeleteRole;
