import { AttributeListType, AttributeType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

export type User = {
  sub?: string;
  email?: string;
  email_verified?: string;
  phone_number?: string;
  phone_number_verified?: string;
}

export default function convertAttributesToUser(attrs: AttributeListType): User {
  return attrs.reduce((user, attr: AttributeType) => ({ ...user, [attr.Name]: attr.Value }), {});
}