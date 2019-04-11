import axios from 'axios';

export const GET_SUMMARY_FETCH = 'GET_SUMMARY_FETCH';
export const GET_SUMMARY_SUCCESS = 'GET_SUMMARY_SUCCESS';
export const GET_SUMMARY_ERROR = 'GET_SUMMARY_ERROR';
export const SEND_SUMMARY_DETAIL_FETCH = 'SEND_SUMMARY_DETAIL_FETCH';
export const SEND_SUMMARY_DETAIL_SUCCESS = 'SEND_SUMMARY_DETAIL_SUCCESS';
export const SEND_SUMMARY_DETAIL_ERROR = 'SEND_SUMMARY_DETAIL_ERROR';
export const CLOSE_SUMMARY_NOTIFICATION = 'CLOSE_SUMMARY_NOTIFICATION';
export const EXIT_SUMMARY_NOTIFICATION = 'EXIT_SUMMARY_NOTIFICATION';

export function getSummary() {
  return (dispatch) => {
    dispatch({ 
      type: GET_SUMMARY_FETCH,
    });
    return axios.get('/summaries/for_user')
    .then(response => {
      dispatch({ 
        type: GET_SUMMARY_SUCCESS,
        payload: response.data
      });
    })
    .catch(e => {
      dispatch({ 
        type: GET_SUMMARY_ERROR, 
        payload: "Ocurrió un error al obtener el dashboard. Por favor intenta más tarde."
      });
      throw e;
    })
  }
}

export function getMonthDetail(month, email) {
  return (dispatch) => {
    dispatch({ 
      type: SEND_SUMMARY_DETAIL_FETCH,
    });
    return axios.post('/summaries/send_by_email', {
      period_start: month.period_start,
      period_end: month.period_end,
    })
    .then(response => {
      dispatch({ 
        type: SEND_SUMMARY_DETAIL_SUCCESS,
        payload: `¡Listo! Pronto recibirás el detalle en ${email}`
      });
    })
    .catch(e => {
      dispatch({ 
        type: SEND_SUMMARY_DETAIL_ERROR, 
        payload: "Hubo un problema al enviar el correo electrónico. Escríbenos a soporte@futuranetwork.com"
      });
      throw e;
    })
  }
}

export function closeNotification() {
  return (dispatch) => {
    dispatch({
      type: CLOSE_SUMMARY_NOTIFICATION,
    })
  }
}

export function exitNotification() {
  return (dispatch) => {
    dispatch({
      type: EXIT_SUMMARY_NOTIFICATION,
    })
  }
}

const dashboardActions = {
  getSummary,
  getMonthDetail,
  closeNotification,
  exitNotification,
};

export default dashboardActions;
