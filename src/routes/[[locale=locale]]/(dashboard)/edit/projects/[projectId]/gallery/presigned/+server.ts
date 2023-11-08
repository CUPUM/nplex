import { S3_BUCKET_NAME } from '$env/static/private';
import { withAuth } from '$lib/auth/guard.server';
import { s3 } from '$lib/storage/s3.server';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { json } from '@sveltejs/kit';
import type { PresignedResponse } from './types';

/**
 * Securely prepare a group of presigned post url for client-side project image variants upload.
 */
export const GET = async (event) => {
	await withAuth(event);
	const name = `projects/${event.params.projectId}/gallery/${crypto
		.randomUUID()
		.replaceAll('-', '')}`;
	const post = await createPresignedPost(s3, {
		Bucket: S3_BUCKET_NAME,
		Key: name,
		// Conditions: [{ acl: 'public-read' }],
		// Fields: {
		// 	acl: 'public-read',
		// },
	});
	return json({
		post,
		name,
	} satisfies PresignedResponse);
};
