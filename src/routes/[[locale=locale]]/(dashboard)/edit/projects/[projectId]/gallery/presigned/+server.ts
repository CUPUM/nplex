import { dev } from '$app/environment';
import {
	S3_ACCESS_KEY,
	S3_BUCKET_NAME,
	S3_BUCKET_REGION,
	S3_SECRET_KEY,
} from '$env/static/private';
import { withAuth } from '$lib/auth/guard.server';
import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { json } from '@sveltejs/kit';
import type { PresignedResponse } from './types';

/** Securely prepare a presigned post url for client-side upload. */
export const GET = async (event) => {
	await withAuth(event);
	const s3 = new S3Client({
		region: S3_BUCKET_REGION,
		credentials: {
			accessKeyId: S3_ACCESS_KEY,
			secretAccessKey: S3_SECRET_KEY,
		},
	});
	const ext = event.url.searchParams.get('ext');
	const name = `${dev ? 'dev/' : ''}projects/${event.params.projectId}/gallery/${crypto
		.randomUUID()
		.replaceAll('-', '')}${ext ? '.' + ext : ''}`;
	const post = await createPresignedPost(s3, {
		Bucket: S3_BUCKET_NAME,
		Key: name,
		Conditions: [{ acl: 'public-read' }],
		Fields: {
			acl: 'public-read',
		},
	});
	return json({
		post,
		name,
	} satisfies PresignedResponse);
};
