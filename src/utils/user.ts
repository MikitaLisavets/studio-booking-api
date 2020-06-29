import { AttributeMap, Converter } from 'aws-sdk/clients/dynamodb';

export type User = {
  ID?: string;
  email?: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  phoneNumberVerified?: boolean;
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