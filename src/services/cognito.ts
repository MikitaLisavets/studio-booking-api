import AWS from  'aws-sdk';
import {
  SignUpRequest,
  SignUpSuccessResponse,
  SignUpFailureResponse
} from '../interfaces/signUp';

import {
  ConfirmSignUpRequest,
  ConfirmSignUpSuccessResponse,
  ConfirmSignUpFailureResponse
} from '../interfaces/confirmSignUp';

AWS.config.update({region: process.env.region});

export const cognitoProvider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: process.env.region,
  region: process.env.region
});

export function signUp({ email, password }: SignUpRequest): Promise<SignUpSuccessResponse | SignUpFailureResponse> {
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

export function confirmSignUp({ email, confirmationCode }: ConfirmSignUpRequest): Promise<ConfirmSignUpSuccessResponse | ConfirmSignUpFailureResponse> {
  const params = {
    ClientId: process.env.AWS_APP_CLIENT_ID,
    ConfirmationCode: confirmationCode,
    Username: email
  };

  return new Promise((resolve, reject) => {
    cognitoProvider.confirmSignUp(params, (error) => {
      if (error) return reject(error);
      resolve({ success: true });
    });
  });
}
