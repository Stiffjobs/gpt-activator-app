import { auth } from '@clerk/nextjs';
import { Kafka } from '@upstash/kafka';
import { NextResponse } from 'next/server';
import { env } from 'stiff-gpt/env.mjs';

export async function POST(request: Request) {
	try {
		const { fileName } = await request.json();
		if (!fileName) {
			return NextResponse.json(
				{ error: 'missing filename in request body' },
				{ status: 400 }
			);
		}
		const { userId } = auth();

		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const url = env.UPSTASH_KAFKA_REST_URL;
		const username = env.UPSTASH_KAFKA_REST_USERNAME;
		const password = env.UPSTASH_KAFKA_REST_PASSWORD;
		const kafka = new Kafka({
			url,
			username,
			password,
		});
		const producer = kafka.producer();
		const message = {
			fileName,
			userId,
		};
		const response = await producer.produce('document', message);
		return NextResponse.json({ response });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
