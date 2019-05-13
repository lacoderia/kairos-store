import axios from 'axios';

let store = '';

export const setStore = name => {
  axios.defaults.params = {};
  axios.defaults.params['company'] = name;
  store = name;
}

export const getStore = () => {
  return store;
}

export const generateStoreUrl = url => {
  return '/' + store + url;
}

export const getStoreLogoUrl = () => {
  let url = '';

  switch(store){
    case 'omein':
      url = '/images/logo-omein.png';
      break;
    case 'prana':
      url = '/images/logo-prana.png';
      break;
    default:
      break;
  }
  return url;
}

const storeService = {
  setStore,
  getStore,
  generateStoreUrl,
  getStoreLogoUrl,
};

export default storeService;