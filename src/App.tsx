import { useEffect } from 'react';

export const App = () => {
  useEffect(() => {
    // Leer parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const adId = params.get('utm_content');
    const phone = params.get('phone');

    console.log('Datos obtenidos:', { adId, phone });

    // Enviar datos al backend
    fetch('https://tuservidor.com/api/tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        adId,
        phone,
        timestamp: new Date().toISOString(),
      }),
    });

    // Redirigir a WhatsApp
    // const whatsappUrl = `https://wa.me/${phone}`;
    const redirectDelay = 100; // en milisegundos

    const timer = setTimeout(() => {
      // window.location.href = whatsappUrl;
    }, redirectDelay);

    // Limpiar timeout en caso el componente se desmonte antes
    return () => clearTimeout(timer);
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
