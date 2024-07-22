import { useState } from 'react';

const useUpdateRole = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateRole = async (roleId, roleData, bearer) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles/${roleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearer}`
        },
        body: JSON.stringify(roleData),
      });
      if (!response.ok) throw new Error('Error updating role');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateRole, loading, error };
};

export default useUpdateRole;
