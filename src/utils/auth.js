export const ACCESS_TOKEN = 'AccessToken'
export const ROLE = 'Role'

export function getToken() {
  return localStorage.getItem(ACCESS_TOKEN)
}

export function getRole() {
  return localStorage.getItem(ROLE)
}

export function setToken(token, role) {
  localStorage.setItem(ACCESS_TOKEN, token)
  localStorage.setItem(ROLE, role)
}

export function removeToken() {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(ROLE)
}
