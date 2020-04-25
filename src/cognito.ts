import AWS from  'aws-sdk';

AWS.config.update({region: process.env.region});

const cognitoProvider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: process.env.region,
  region: process.env.region
});

export default cognitoProvider;