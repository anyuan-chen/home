import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 } from "uuid";

const GetFileAtBucketKey = async (
  client: S3Client,
  bucket: string,
  key: string
) => {
  const result = await client.send(
    new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    })
  );
  const data = await result.Body?.transformToByteArray();
  return data;
};

export const generatePresignedUrl = async (
  contentType: string,
  contentLength: number,
  extension: string,
  expiresIn: number,
  bucketName: string
): Promise<{ presignedUrl: string; readUrl: string }> => {
  const region = process.env.AWS_REGION;
  if (contentLength > 1024 * 1024 * 200) {
    throw new Error(
      `File may not be over 200MB. Yours is ${contentLength} bytes.`
    );
  }
  console.log({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID as string,
  });
  const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID as string,
    },
  });

  const key = v4();

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key + "." + extension,
    ACL: "public-read",
    ContentLength: contentLength,
    ContentType: contentType,
  });

  const presignedUrl = await getSignedUrl(client, command, {
    expiresIn,
  });

  // The location of the assset after the upload
  const readUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${key}.${extension}`;

  return { presignedUrl, readUrl };
};

export { GetFileAtBucketKey };
