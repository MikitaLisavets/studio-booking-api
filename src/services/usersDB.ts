import AWS, { AWSError } from  'aws-sdk';
import { User, convertUserToDBAttributes } from '../utils/user';
import { PutItemOutput, GetItemOutput } from 'aws-sdk/clients/dynamodb';

AWS.config.update({region: process.env.region});

const usersTableName = process.env.usersTableName;
const db = new AWS.DynamoDB();

export function getUserFromDB(id: string): Promise<GetItemOutput | AWSError> {
  const params = {
    TableName: usersTableName,
    Key: {
      ID: { S: id }
    },
  };

  return new Promise((resolve, reject) => {
    db.getItem(params, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}

export function putUserToDB(user: User): Promise<PutItemOutput | AWSError> {
  const params = {
    TableName: usersTableName,
    Item: convertUserToDBAttributes(user)
  };

  return new Promise((resolve, reject) => {
    db.putItem(params, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}
