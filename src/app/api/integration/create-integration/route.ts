import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { supabaseClient } from 'stiff-gpt/utils/supabaseClient';

export async function POST(request: Request) {
	try {
		const { name, channelId, type, documentId, details, origin } =
			await request.json();
		if (type === 'LINE') {
			if (!channelId || !details) {
				return NextResponse.json(
					{ error: 'missing channelId' },
					{ status: 400 }
				);
			}
		}
		if (!name || !type || !documentId) {
			return NextResponse.json(
				{ error: 'missing name, type, or documentID' },
				{ status: 400 }
			);
		}
		const { userId, getToken } = auth();
		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		const supabaseToken = await getToken({ template: 'supabase' });
		if (!supabaseToken) throw new Error('Missing supabase token');

		const supabase = supabaseClient(supabaseToken);
		const { error } = await supabase.from('Integration').insert({
			userId,
			channelId,
			origin,
			name,
			documentId,
			details,
			type,
		});
		if (error) {
			throw error;
		}
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
