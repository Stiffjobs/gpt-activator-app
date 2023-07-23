import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from 'stiff-gpt/env.mjs';
const createPresignedUrlWithClient = ({
	region,
	bucket,
	key,
}: {
	region: string;
	bucket: string;
	key: string;
}) => {
	const client = new S3Client({
		region,
		credentials: fromIni({ profile: 'gpt-activator' }),
	});
	const command = new PutObjectCommand({ Bucket: bucket, Key: key });
	return getSignedUrl(client, command, { expiresIn: 360 });
};
export async function POST(request: Request) {
	const { fileName } = await request.json();
	if (!fileName) {
		return NextResponse.json(
			{ error: 'missing filename param' },
			{ status: 400 }
		);
	}
	const { userId } = auth();
	if (!userId) {
		return new Response('Unauthorized', { status: 401 });
	}
	const key = `documents/${userId}/${fileName}`;
	try {
		const url = await createPresignedUrlWithClient({
			region: env.AWS_S3_REGION,
			bucket: env.AWS_S3_BUCKET,
			key,
		});

		return NextResponse.json({ url });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
