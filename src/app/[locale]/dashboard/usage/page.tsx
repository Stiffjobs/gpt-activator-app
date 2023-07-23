import { auth } from '@clerk/nextjs';
import SettingsHeader from 'stiff-gpt/components/SettingsHeader';
import UsageBarChart from 'stiff-gpt/components/usage/UsageBarChart';
import { getUsageList } from 'stiff-gpt/utils/api/getUsageList';
import { supabaseClient } from 'stiff-gpt/utils/supabaseClient';

export type Usage = {
	id: number;
	integrationId: number | null;
	recordDate: string | null;
	tokenCount: number;
	Integration: {
		type: 'LINE' | 'JAVASCRIPT' | null;
	} | null;
	userId: string;
};

export default async function Page() {
	const usage = await getUsageList();

	return (
		<div className="flex w-full justify-center pt-4">
			<div className="flex w-4/5 flex-col px-12 pt-8">
				<SettingsHeader title={'usage.title'} />
				<UsageBarChart data={usage} />
			</div>
		</div>
	);
}
