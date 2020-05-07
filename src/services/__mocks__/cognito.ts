export function signUp({ password, email }) {
  return new Promise((resolve, reject) => {
    if (password && email) return resolve({ UserConfirmed: false });
    reject({ message: 'errorMessage', code: 'errorCode', statusCode: 400 });
  });
}

export function confirmSignUp({ confirmationCode, email }) {
  return new Promise((resolve, reject) => {
    if (confirmationCode && email) return resolve({ success: true });
    reject({ message: 'errorMessage', code: 'errorCode', statusCode: 400 });
  });
}

export function getAdminUser({ email }) {
  return new Promise((resolve, reject) => {
    if (email) return resolve({ UserStatus: 'CONFIRMED' });
    reject({ message: 'errorMessage', code: 'errorCode', statusCode: 400 });
  });
}

export function listUsers() {
  return new Promise((resolve) => {
    resolve({ Users: [{ UserName: 'email@email.com' }] });
  });
}

export function initiateAuth(params) {
  return new Promise((resolve, reject) => {
    if (params) return resolve({ AuthenticationResult: { AccessToken: 'AccessToken', RefreshToken: 'RefreshToken' } })
    reject({ message: 'errorMessage', code: 'errorCode', statusCode: 400 });
  });
}

export function getToken({ email, password }){
  return new Promise((resolve, reject) => {
    if (email && password ) return resolve({ AuthenticationResult: { AccessToken: 'AccessToken', RefreshToken: 'RefreshToken' } })
    reject({ message: 'errorMessage', code: 'errorCode', statusCode: 400 });
  });
}

export function refreshTokens({ refreshToken }) {
  return new Promise((resolve, reject) => {
    if ( refreshToken ) return resolve({ AuthenticationResult: { AccessToken: 'AccessToken' } })
    reject({ message: 'errorMessage', code: 'errorCode', statusCode: 400 });
  });
}


export function getUser({ accessToken }) {
  return new Promise((resolve, reject) => {
    if ( accessToken ) return resolve({ UserAttributes: [{ Name: 'email', Value: 'email@email.com' }] })
    reject({ message: 'errorMessage', code: 'errorCode', statusCode: 400 });
  });
}