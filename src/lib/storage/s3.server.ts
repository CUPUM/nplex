import { S3_ACCESS_KEY, S3_BUCKET_REGION, S3_SECRET_KEY } from '$env/static/private';
import { S3Client } from '@aws-sdk/client-s3';

export function s3() {
	new S3Client({
		region: S3_BUCKET_REGION,
		credentials: {
			accessKeyId: S3_ACCESS_KEY,
			secretAccessKey: S3_SECRET_KEY,
		},
	});
}
