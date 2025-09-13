import {getCookie} from './mixins/Cookies'

export function isAuthenticated() {
  return !!getCookie('token');
}

export function isProfileCompleted (){
  const profileStatus = JSON.parse(window.localStorage.getItem('userInfo'))?.is_profile_complete || true

  return profileStatus;
}