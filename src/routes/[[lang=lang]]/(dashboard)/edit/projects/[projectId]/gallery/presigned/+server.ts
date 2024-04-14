import { S3_BUCKET_NAME } from '$env/static/private';
import { authorize } from '$lib/auth/rbac.server';
import { storage } from '$lib/storage/storage.server';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { json } from '@sveltejs/kit';
import type { PresignedResponse } from './types';

/**
 * Securely prepare a group of presigned post url for client-side project image variants upload.
 */
export const GET = async (event) => {
	authorize(event);
	const name = `projects/${event.params.projectId}/gallery/${crypto
		.randomUUID()
		.replaceAll('-', '')}`;
	const post = await createPresignedPost(storage, {
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
