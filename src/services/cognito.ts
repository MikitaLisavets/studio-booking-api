import AWS, { AWSError } from  'aws-sdk';
import { ConfirmSignUpRequest, SignUpRequest, GetAdminUserRequest, GetTokenRequest, RefreshTokenRequest, GetUserRequest } from '../interfaces/cognito';
import { AdminGetUserResponse, ConfirmSignUpResponse, SignUpResponse, ListUsersResponse, InitiateAuthResponse, InitiateAuthRequest, GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';

AWS.config.update({region: process.env.region});

export const cognitoProvider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-19',
  region: process.env.region
});

export function signUp({ email, phoneNumber, password }: SignUpRequest): Promise<SignUpResponse | AWSError> {
  const params = {
    ClientId: process.env.AWS_APP_CLIENT_ID,
    Password: password,
    Username: email,
    UserAttributes: [{ Name: 'email', Value: email }, { Name: 'phone_number', Value: phoneNumber }],
    ValidationData: [{ Name: 'email', Value: email }, { Name: 'phone_number', Value: phoneNumber }]
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

export function getAdminUser({ email }: GetAdminUserRequest): Promise<AdminGetUserResponse | AWSError> {
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

export function initiateAuth(params: InitiateAuthRequest): Promise<InitiateAuthResponse | AWSError> {
  return new Promise((resolve, reject) => {
    cognitoProvider.initiateAuth(params, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}

export function getToken({ email, password }: GetTokenRequest): Promise<InitiateAuthResponse | AWSError> {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.AWS_APP_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password
    }
  };

  return initiateAuth(params);
}

export function refreshTokens({ refreshToken }: RefreshTokenRequest): Promise<InitiateAuthResponse | AWSError> {
  const params = {
    AuthFlow: 'REFRESH_TOKEN_AUTH',
    ClientId: process.env.AWS_APP_CLIENT_ID,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
    }
  };

  return initiateAuth(params);
}


export function getUser({ accessToken }: GetUserRequest): Promise<GetUserResponse | AWSError> {
  const params = {
    AccessToken: accessToken
  };

  return new Promise((resolve, reject) => {
    cognitoProvider.getUser(params, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}
