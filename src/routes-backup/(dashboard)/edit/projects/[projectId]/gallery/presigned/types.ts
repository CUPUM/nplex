import type { PresignedPost } from '@aws-sdk/s3-presigned-post';

export type PresignedResponse = { name: string; post: PresignedPost };
