// EmailJS Configuration
// Obtén estas credenciales desde https://dashboard.emailjs.com/

export const emailJsConfig = {
  // Tu Public Key de EmailJS (Dashboard -> Account -> General)
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'TU_PUBLIC_KEY_AQUI',
  
  // Tu Service ID (Dashboard -> Email Services)
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'TU_SERVICE_ID_AQUI',
  
  // Tu Template ID (Dashboard -> Email Templates)
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'TU_TEMPLATE_ID_AQUI',
};

// Ejemplo de variables de entorno (.env)
/*
VITE_EMAILJS_PUBLIC_KEY=tu_public_key_real
VITE_EMAILJS_SERVICE_ID=tu_service_id_real
VITE_EMAILJS_TEMPLATE_ID=tu_template_id_real
*/
