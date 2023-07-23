import { auth } from '@clerk/nextjs';
import { Usage } from 'stiff-gpt/app/[locale]/dashboard/usage/page';
import { supabaseClient } from '../supabaseClient';

export async function getUsageList(): Promise<Usage[]> {
	const { userId, getToken } = auth();

	const supabaseToken = await getToken({ template: 'supabase' });

	try {
		if (!supabaseToken) throw new Error('failed to get token');
		const supabase = supabaseClient(supabaseToken);
		const today = new Date();
		const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 2)
			.toISOString()
			.split('T')[0];

		// Get the last day of the month
		const lastDayOfMonth = new Date(
			today.getFullYear(),
			today.getMonth() + 1,
			1
		)
			.toISOString()
			.split('T')[0];
		const { data, error } = await supabase
			.from('Usage')
			.select('*, Integration(type)')
			.eq('userId', userId)
			.gte('recordDate', firstDayOfMonth)
			.lte('recordDate', lastDayOfMonth)
			.order('recordDate', { ascending: true });
		if (error) throw error;
		return data;
	} catch (error) {
		console.error(error);
	}

	return [];
}
