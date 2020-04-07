import { success, failure } from './libs/response-lib';

const AWS = require('aws-sdk');

const s3 = new AWS.S3();
// const bucketName = process.env.AWS_BUCKET_NAME;

export async function main(event, context) {
  const data = JSON.parse(event.body);
  if (!data.hasOwnProperty('contentType')) {
    return failure({ err: 'Missing contentType' });
  }

  if (!data.hasOwnProperty('filePath')) {
    return success({ err: 'Missing filePath' });
  }

  const key = `private/${event.requestContext.identity.cognitoIdentityId}/${data.filePath}`;
  const params = {
    Bucket: 'cards-uploads-dev',
    Key: key,
    ContentType: data.contentType,
  };

  try {
    const url = await s3.getSignedUrlPromise('putObject', params);
    return success({
      url, key,
    });
  } catch (err) {
    return failure({ test: 'there has been an error', err });
  }
}
