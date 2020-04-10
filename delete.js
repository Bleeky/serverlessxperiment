import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      cardId: event.pathParameters.id,
    },
  };


  try {
    await dynamoDbLib.delete(params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false, error: e });
  }
}
