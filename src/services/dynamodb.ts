import AWS from  'aws-sdk';

AWS.config.update({region: process.env.region});

const usersTableName = process.env.usersTableName;
const documentClient = new AWS.DynamoDB.DocumentClient();

const DB = {
  async get(ID: string): Promise<AWS.DynamoDB.DocumentClient.AttributeMap> {
    const params = {
      TableName: usersTableName,
      Key: {
        ID,
      },
    };

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw Error(`There was an error fetching the data for ID of ${ID} from ${usersTableName}`);
    }

    return data.Item;
  },
};


export default DB;