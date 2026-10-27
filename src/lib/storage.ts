import {
	GetObjectCommand,
	NoSuchKey,
	PutObjectCommand,
	S3Client
} from '@aws-sdk/client-s3'

// Theme screenshots live in an S3-compatible bucket (Railway's), at the same
// paths they had in Supabase Storage's "public-files" bucket.
// Server-only: never import this in client-side code.

let client: S3Client | null = null

function getClient(): S3Client {
	if (!client) {
		client = new S3Client({
			endpoint: process.env.S3_ENDPOINT,
			region: process.env.S3_REGION || 'auto',
			forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
			credentials: {
				accessKeyId: process.env.S3_ACCESS_KEY_ID!,
				secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!
			}
		})
	}
	return client
}

export async function getFile(path: string): Promise<Buffer | null> {
	try {
		const res = await getClient().send(
			new GetObjectCommand({ Bucket: process.env.S3_BUCKET, Key: path })
		)
		if (!res.Body) return null
		return Buffer.from(await res.Body.transformToByteArray())
	} catch (err) {
		if (err instanceof NoSuchKey) return null
		throw err
	}
}

export async function putFile(
	path: string,
	body: Buffer,
	options: { contentType: string; cacheControl: string }
): Promise<void> {
	await getClient().send(
		new PutObjectCommand({
			Bucket: process.env.S3_BUCKET,
			Key: path,
			Body: body,
			ContentType: options.contentType,
			CacheControl: options.cacheControl
		})
	)
}
