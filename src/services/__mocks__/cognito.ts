export function signUp({ password, email }) {
  return new Promise((resolve, reject) => {
    if (password && email) resolve({ UserConfirmed: false });
    reject({ message: 'errorMessage', code: 'errorCode' });
  });
}

export function confirmSignUp({ confirmationCode, email }) {
  return new Promise((resolve, reject) => {
    if (confirmationCode && email) resolve({ success: true });
    reject({ message: 'errorMessage', code: 'errorCode' });
  });
}

export function getUser({ email }) {
  return new Promise((resolve, reject) => {
    if (email) resolve({ UserStatus: 'CONFIRMED' });
    reject({ message: 'errorMessage', code: 'errorCode' });
  });
}