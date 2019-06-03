// Sandbox
// export const API_ROOT = 'https://servicios.coderia.mx:445';
// export const IMAGE_URL_ROOT = 'https://servicios.coderia.mx:445';
// export const CONTACT_EMAIL = 'contacto@futuranetwork.com';

//Production
export const API_ROOT = 'https://backend.futuranetwork.com';
export const IMAGE_URL_ROOT = 'https://backend.futuranetwork.com';
export const CONTACT_EMAIL = 'contacto@futuranetwork.com';

export const STORE_PICKUP_ADDRESS = {
  id: 0,
  name: 'Recoger en persona',
  address: 'Los productos se recogen con el personal de Futura Network',
  primary: true,
};

const constants = {
  API_ROOT,
  IMAGE_URL_ROOT,
  CONTACT_EMAIL,
  STORE_PICKUP_ADDRESS,
};

export default constants;