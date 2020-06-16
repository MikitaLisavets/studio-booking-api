export function getUserFromDB(id) {
  return new Promise((resolve, reject) => {
    if (id) return resolve({ email: 'email@email.com', emailVerified: 'true' });
    reject({ message: 'errorMessage', code: 'errorCode', statusCode: 400 });
  });
}


export function putUserToDB(id, user) {
  return new Promise((resolve, reject) => {
    if (id && user) return resolve({});
    reject({ message: 'errorMessage', code: 'errorCode', statusCode: 400 });
  });
}