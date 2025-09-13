// to handle get data from cookie
export function getCookie (name){
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// to handle store data in cookie
export function setCookie(cookieName){
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + (12 * 60 * 60 * 1000));
  document.cookie = `token=${cookieName}; expires=${expirationDate.toUTCString()}; path=/`;
}

// to handle delete stored data in cookie
export function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
