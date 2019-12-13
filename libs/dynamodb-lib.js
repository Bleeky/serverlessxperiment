// eslint-disable-next-line import/no-extraneous-dependencies
import AWS from 'aws-sdk';

const call = (action, params) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
};

export {
  call,
};
