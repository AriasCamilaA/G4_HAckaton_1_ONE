import { useState } from 'react';

const useUpdateRole = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateRole = async (roleId, roleData) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles/${roleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roleData),
      });
      if (!response.ok) throw new Error('Error updating role');
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { updateRole, loading, error };
};

export default useUpdateRole;
