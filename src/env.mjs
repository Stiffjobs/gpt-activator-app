import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		OPENAI_API_KEY: z.string().min(1),
		SUPABASE_KEY: z.string().min(1),
		SUPABASE_URL: z.string().url(),
		UPSTASH_REDIS_REST_URL: z.string().url(),
		UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
		AWS_S3_BUCKET: z.string().min(1),
		AWS_S3_REGION: z.string().min(1),
		UPSTASH_KAFKA_REST_URL: z.string().url(),
		UPSTASH_KAFKA_REST_USERNAME: z.string().min(1),
		UPSTASH_KAFKA_REST_PASSWORD: z.string().min(1),
	},
	client: {},
	experimental__runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		SUPABASE_KEY: process.env.SUPABASE_KEY,
		SUPABASE_URL: process.env.SUPABASE_URL,
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
		UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
		UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
		AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
		AWS_S3_REGION: process.env.AWS_S3_REGION,
		UPSTASH_KAFKA_REST_URL: process.env.UPSTASH_KAFKA_REST_URL,
		UPSTASH_KAFKA_REST_USERNAME: process.env.UPSTASH_KAFKA_REST_USERNAME,
		UPSTASH_KAFKA_REST_PASSWORD: process.env.UPSTASH_KAFKA_REST_PASSWORD,
	},
});
