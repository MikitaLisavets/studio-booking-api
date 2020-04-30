import AWS, { AWSError } from  'aws-sdk';
import { ConfirmSignUpRequest, SignUpRequest, GetUserRequest } from '../interfaces/cognito';
import { AdminGetUserResponse, ConfirmSignUpResponse, SignUpResponse, ListUsersResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';

AWS.config.update({region: process.env.region});

export const cognitoProvider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: process.env.region,
  region: process.env.region
});

export function signUp({ email, password }: SignUpRequest): Promise<SignUpResponse | AWSError> {
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

export function confirmSignUp({ email, confirmationCode }: ConfirmSignUpRequest): Promise<ConfirmSignUpResponse | AWSError> {
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

export function getUser({ email }: GetUserRequest): Promise<AdminGetUserResponse | AWSError> {
  const params = {
    UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    Username: email
  };

  return new Promise((resolve, reject) => {
    cognitoProvider.adminGetUser(params, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}

export function listUsers(): Promise<ListUsersResponse | AWSError> {
  const params = {
    UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID
  };

  return new Promise((resolve, reject) => {
    cognitoProvider.listUsers(params, (error, data) =>  {
      if (error) return reject(error);
      resolve(data);
    });
  });
}