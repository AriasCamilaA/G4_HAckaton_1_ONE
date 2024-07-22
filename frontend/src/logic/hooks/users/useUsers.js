import { useState, useEffect } from 'react';
import { adaptUser } from '../adapters/userAdapter';

const useUsers = (bearer) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/all`, {
          headers: {
            'Authorization': `Bearer ${bearer}`
          }
        });
        const data = await response.json();
        setUsers(data.map(adaptUser));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [bearer]);

  return { users, loading, error };
};

export default useUsers;
