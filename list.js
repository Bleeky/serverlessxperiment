import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
  let from = {};
  Object.keys(event.queryStringParameters || {}).forEach((key) => {
    if (key.includes('from-')) {
      if (key.split('-')[2] === 'n') from = { ...from, [key.split('-')[1]]: parseInt(event.queryStringParameters[key], 10) };
      else from = { ...from, [key.split('-')[1]]: event.queryStringParameters[key] };
    }
  });
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: 'userId = :userId',
    IndexName: 'userId-createdAt-index',
    Limit: event.queryStringParameters && event.queryStringParameters.lim || null,
    ExclusiveStartKey: Object.keys(from).length ? from : null,
    ScanIndexForward: false,
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId,
    },
  };

  try {
    const result = await dynamoDbLib.call('query', params);
    return success({
      cards: result.Items,
      total: result.ScannedCount,
      queryTotal: result.Count,
      next: result.LastEvaluatedKey,
    });
  } catch (e) {
    return failure({ status: false, error: e });
  }
}
