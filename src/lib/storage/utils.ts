import { S3_BUCKET_NAME, S3_BUCKET_REGION } from '$env/static/private';

export function getStorageUrl(name: string) {
	return `https://${S3_BUCKET_NAME}.s3.${S3_BUCKET_REGION}.amazonaws.com/${name}`;
}
