import { useEffect } from 'react';

export const App = () => {
  const ENDPOINT = 'https://tu-api.com/endpoint/123';
  const URL_DESTINO = 'https://www.google.com';

  useEffect(() => {

    const ejecutarPostYRedirigir = async () => {
      try {

        const parametros = {
          param1: 'valor1',
          param2: 'valor2',
          param3: 'valor3'
        };
        
        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parametros)
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        
        window.location.href = URL_DESTINO;
        
      } catch (error) {
        console.error('Error en la petición POST:', error);
        window.location.href = URL_DESTINO;
      }
    };

    ejecutarPostYRedirigir();
  }, []);

  // Mensaje mientras se procesa (opcional - puedes cambiarlo o retornar null)
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <p>Enviando datos...</p>
    </div>
  );
};
