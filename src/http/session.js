import axios from 'axios';

function isHttpHeaders(){
  return (getHttpHeaders() ? true : false);
};

function getHttpHeaders(){
  return JSON.parse(localStorage.getItem('kairos-hdr'));
};

function configHttpHeaders(){
  var headers = getHttpHeaders();

  axios.defaults.headers.common['access-token'] = headers["access-token"];
  axios.defaults.headers.common['expiry'] = headers["expiry"];
  axios.defaults.headers.common['token-type'] = headers["token-type"];
  axios.defaults.headers.common['uid'] = headers["uid"];
  axios.defaults.headers.common['client'] = headers["client"];
};

function setHttpHeaders(headers){
  localStorage.setItem('kairos-hdr', JSON.stringify(headers));
  configHttpHeaders();
};

function unsetHttpHeaders(){
  localStorage.removeItem('kairos-hdr');

  axios.defaults.headers.common['access-token'] = undefined;
  axios.defaults.headers.common['expiry'] = undefined;
  axios.defaults.headers.common['token-type'] = undefined;
  axios.defaults.headers.common['uid'] = undefined;
  axios.defaults.headers.common['client'] = undefined;
};

function getCurrentSession() {
  return axios.get('/session');
}

function login(values) {
  return axios.post('/users/sign_in', {
    user: {
      email: values.get('email').toLowerCase(),
      password: values.get('password'),
    }
  })
  .then(response => {
    setHttpHeaders(response.headers);
    return response;
  });
}

function resendConfirmationEmail(email) {
  return axios.post('/auth/confirmation', { 
    user: {
      email: email.toLowerCase(),
    }
  });
};

function register(values) {
  return axios.post('/users/sign_up', { 
    user: {
      first_name: values.get('name'),
      last_name: values.get('lastname'),
      email: values.get('email').toLowerCase(),
      external_id: values.get('externalId'),
      sponsor_external_id: values.get('sponsorExternalId'),
      placement_external_id: values.get('placementExternalId'),
      transaction_number: values.get('transactionNumber'),
      iuvare_id: values.get('iuvareId'),
      phone: values.get('phone'),
      password: values.get('password'),
      password_confirmation: values.get('password'),
    }
  });
};

function confirmRegistration(token) {
  return axios.get('/users/confirm', {
    params : {
      confirmation_token: token
    }
  });
};

function recoverPassword(values) {
  return axios.post('/users/password', {
    utf8: 'V',
    user: {
      email: values.get('email').toLowerCase(),
    }
  });
}

function resetPassword(values, token) {
  return axios.put('/auth/password', {
    utf8: 'V',
    user: {
      reset_password_token: token,
      password: values.get('password'),
      password_confirmation: values.get('password'),
    }
  });
}

function signout() {
  return axios.get('/logout')
  .then(response => {
    unsetHttpHeaders(response.headers);
    return response;
  })
  .catch(e => {
    throw e;
  });
}

function getIpInfo() {
  return axios.get('http://ipinfo.io', {})
  .then(response => {
    if(response.data){
      return response.data.city + ', ' + response.data.country;
    }
    return '';
  })
  .catch(e => {
    return '';
  });
}

const session = {
  isHttpHeaders,
  getHttpHeaders,
  configHttpHeaders,
  setHttpHeaders,
  unsetHttpHeaders,
  getCurrentSession,
  login,
  resendConfirmationEmail,
  register,
  confirmRegistration,
  recoverPassword,
  resetPassword,
  signout,
  getIpInfo
};

export default session;
