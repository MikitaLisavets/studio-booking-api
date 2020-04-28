export function signUp({ password, email }) {
  return new Promise((resolve, reject) => {
    if (password && email) resolve({ UserConfirmed: false });
    reject({ message: 'errorMessage', code: 'errorCode' });
  });
}