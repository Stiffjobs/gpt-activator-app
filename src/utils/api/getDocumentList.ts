import { auth } from '@clerk/nextjs';
import { Document } from 'stiff-gpt/app/[locale]/dashboard/document/page';
import { supabaseClient } from '../supabaseClient';

export async function getDocumentList(): Promise<Document[]> {
	const { userId, getToken } = auth();
	const supabaseToken = await getToken({ template: 'supabase' });

	try {
		if (!supabaseToken) throw new Error('failed to get token');
		const supabase = supabaseClient(supabaseToken);
		const { data, error } = await supabase
			.from('Document')
			.select('*')
			.eq('userId', userId);
		if (error) throw error;
		return data;
	} catch (error) {
		console.error(error);
	}
	return [];
}
