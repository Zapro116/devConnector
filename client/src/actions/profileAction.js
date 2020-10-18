import axios from 'axios';
import {GET_PROFILE,PROFILE_LOADING,GET_ERRORS, SET_CURRENT_USER} from './types';

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile').then(res =>
    dispatch({
    type: GET_PROFILE,
    payload: res.data
  }))
  .catch(err =>
    dispatch({
    type: GET_PROFILE,
    payload: {}
  }))
}

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

export const createProfile = (profileData,history) => dispatch => {
  axios.post('/api/profile',profileData)
  .then(res => history.push('/dashboard'))
  .catch(err => dispatch({
    type:GET_ERRORS,
    payload: err.response.data
  }))
};

export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure? THIS CANNOT BE UNDONE!')){
    axios.delete('/api/profile')
    .then(res => dispatch({
      type:SET_CURRENT_USER,
      payload: {}
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
  }
};

export const addExperience = (expData,history) => dispatch => {
  axios.post('/api/profile/experience',expData)
  .then(res => history.push('/dashboard'))
  .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
  }))
};

export const addEducation = (expData,history) => dispatch => {
  axios.post('/api/profile/education',expData)
  .then(res => history.push('/dashboard'))
  .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
  }))
};

export const deleteExperience = id => dispatch => {
  axios.delete(`/api/profile/experience/${id}`)
  .then(res => dispatch({
    type:GET_PROFILE,
    payload:res.data
  }))
  .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
  }))
};

export const deleteEducation = id => dispatch => {
  axios.delete(`/api/profile/education/${id}`)
  .then(res => dispatch({
    type:GET_PROFILE,
    payload:res.data
  }))
  .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
  }))
};