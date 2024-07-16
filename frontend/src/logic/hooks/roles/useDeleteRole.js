import { useState } from 'react';

const useDeleteRole = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteRole = async (roleId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/roles/${roleId}`, {
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
