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
  return `/${store}` + url;
}

export const getStoreAssetUrl = (type, filename) => {
  return `/${type}/${store}/${filename}`;
}

const storeService = {
  setStore,
  getStore,
  generateStoreUrl,
  getStoreAssetUrl,
};

export default storeService;