import AWS from  'aws-sdk';
import { Request, SuccessResponse, FailureResponse } from '../interfaces/signUp';

AWS.config.update({region: process.env.region});

export const cognitoProvider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: process.env.region,
  region: process.env.region
});

export function signUp({ email, password }: Request): Promise<SuccessResponse | FailureResponse> {
  const params = {
    ClientId: process.env.AWS_APP_CLIENT_ID,
    Password: password,
    Username: email,
    UserAttributes: [{ Name: 'email', Value: email }],
    ValidationData: [{ Name: 'email', Value: email }]
  };

  return new Promise((resolve, reject) => {
    cognitoProvider.signUp(params, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}
