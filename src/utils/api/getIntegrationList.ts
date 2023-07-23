import { auth } from '@clerk/nextjs';
import { Integration } from 'stiff-gpt/app/[locale]/dashboard/integration/page';
import { supabaseClient } from '../supabaseClient';

export async function getIntegrationList(): Promise<Integration[]> {
	const { userId, getToken } = auth();
	const supabaseToken = await getToken({
		template: 'supabase',
	});
	try {
		if (!supabaseToken) throw new Error('failed to get token');
		const supabase = supabaseClient(supabaseToken);
		const { data, error } = await supabase
			.from('Integration')
			.select('*')
			.eq('userId', userId);
		if (error) throw error;
		return data;
	} catch (error) {}
	return [];
}
