import { useState } from 'react';

const useCreateKey = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createKey = async (keyData, bearer) => {
    setLoading(true);
    try {
      setLoading(true); // Es una buena práctica asegurar que la carga comience antes de la llamada fetch
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/keys`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearer}`
        },
        body: JSON.stringify(keyData),
      });
    
      if (!response.ok) {
        // Maneja errores de respuesta aquí
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la clave');
      }
    
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log( err);
      setError(err);
    } finally {
      setLoading(false);
    }
    
  };

  return { createKey, loading, error };
};

export default useCreateKey;
