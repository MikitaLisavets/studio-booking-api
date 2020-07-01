export function getUserFromDB(id) {
  return new Promise((resolve, reject) => {
    if (id) return resolve({ Item: {
        email: { S: 'email@email.com' },
        emailVerified: { BOOL: true }
      }
    });
    reject({ message: 'errorMessage', code: 'errorCode', statusCode: 400 });
  });
}


export function putUserToDB(user) {
  return new Promise((resolve, reject) => {
    if (user) return resolve({});
    reject({ message: 'errorMessage', code: 'errorCode', statusCode: 400 });
  });
}