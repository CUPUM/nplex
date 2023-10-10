import { dev } from '$app/environment';
import { S3_BUCKET_NAME } from '$env/static/private';
import { withAuth } from '$lib/auth/guard.server';
import { s3 } from '$lib/storage/s3.server';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { json } from '@sveltejs/kit';
import type { PresignedResponse } from './types';

/** Securely prepare a presigned post url for client-side upload. */
export const GET = async (event) => {
	await withAuth(event);
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
