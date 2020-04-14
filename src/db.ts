import AWS from  'aws-sdk';

AWS.config.update({region: process.env.region});

const TableName = process.env.tableName;
const documentClient = new AWS.DynamoDB.DocumentClient();

const DB = {
  async get(ID: string): Promise<AWS.DynamoDB.DocumentClient.AttributeMap> {
    const params = {
      TableName,
      Key: {
        ID,
      },
    };

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`);
    }
    console.log(data);

    return data.Item;
  },
};


export default DB;