import { useEffect } from 'react';

export const App = () => {
  useEffect(() => {
    // Leer parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const adId = params.get('utm_content');
    const phoneNumberManager = params.get('phoneNumberManager');

    console.log('Datos obtenidos:', { adId, phoneNumberManager });

    // Enviar datos al backend
    fetch('https://callhub.insalud.pe/api/meta/captureAdId', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        adId,
        phoneNumberManager,
        timestamp: new Date().toISOString(),
      }),
    });

    // Crear enlace personalizado a WhatsApp
    const mensaje = encodeURIComponent("¡Hola! Me interesa obtener más información sobre sus servicios.");
    const whatsappUrl = `https://wa.me/${phoneNumberManager}?text=${mensaje}`;
    const redirectDelay = 100; // en milisegundos

    const timer = setTimeout(() => {
      window.location.href = whatsappUrl;
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
