import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { authMiddleware } from '@clerk/nextjs';
import createIntlMiddleware from 'next-intl/middleware';

// Set the paths that don't require the user to be signed in
const publicPaths = [
	'/',
	'/:locale/sign-in',
	'/:locale/sign-up',
	'/sign-in',
	'/sign-up',
	'/api',
	'/:locale',
];
const locales = ['zh'];

const ratelimit = new Ratelimit({
	redis: Redis.fromEnv(),
	limiter: Ratelimit.cachedFixedWindow(20, '10s'),
	ephemeralCache: new Map(),
	analytics: true,
});

const intlMiddleware = createIntlMiddleware({
	locales,
	defaultLocale: 'zh',
});

export default authMiddleware({
	beforeAuth: async (req: NextRequest, event: NextFetchEvent) => {
		const ip = req.ip ?? '127.0.0.1';

		const { success, pending, limit, reset, remaining } = await ratelimit.limit(
			`ratelimit_middleware_${ip}`
		);
		event.waitUntil(pending);
		const res = success
			? NextResponse.next()
			: NextResponse.redirect(new URL('/api/blocked', req.url));

		res.headers.set('X-RateLimit-Limit', limit.toString());
		res.headers.set('X-RateLimit-Remaining', remaining.toString());
		res.headers.set('X-RateLimit-Reset', reset.toString());
		if (!success) {
			return res;
		}
		return intlMiddleware(req);
	},
	publicRoutes: publicPaths,
});
export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
