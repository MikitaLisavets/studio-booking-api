import { AttributeMap, Converter } from 'aws-sdk/clients/dynamodb';
import { AttributeListType, AttributeType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

export type User = {
  ID?: string;
  email?: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  phoneNumberVerified?: boolean;
}

export type CognitoUser = {
  sub?: string;
  email?: string;
  email_verified?: boolean;
  phone_number?: string;
  phone_number_verified?: boolean;
}

export function convertCognitoAttributesToUser(attrs: AttributeListType): User {
  const initUser: CognitoUser = {};
  const userAttrs = attrs.reduce((user, attr: AttributeType) => ({ ...user, [attr.Name]: attr.Value }), initUser);
  const isTrue = (str: unknown): boolean => str === 'true';

  return {
    ID: userAttrs.sub || '',
    email: userAttrs.email || '',
    emailVerified: isTrue(userAttrs.email_verified),
    phoneNumber: userAttrs.phone_number || '',
    phoneNumberVerified: isTrue(userAttrs.phone_number_verified)
  };
}

export function convertUserToDBAttributes(user: User): AttributeMap {
  return Converter.marshall(user);
}

export function convertDBAttributesToUser(attrs: AttributeMap): User {
  return Converter.unmarshall(attrs);
}

export function mapOutputUser(user: User): User {
  const { email, phoneNumber } = user;
  return { email, phoneNumber };
}