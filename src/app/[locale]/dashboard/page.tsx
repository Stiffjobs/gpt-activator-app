import { currentUser, useAuth, useUser } from '@clerk/nextjs';
import { supabaseClient } from '../../../utils/supabaseClient';
import { auth } from '@clerk/nextjs';
import SettingsHeader from 'stiff-gpt/components/SettingsHeader';

interface Credit {
	credits: number | null;
	expireAt: string | null;
	id: number;
	used: number | null;
	userId: string | null;
}
async function getCredit(): Promise<Credit | null> {
	const { userId, getToken } = auth();
	const supabaseToken = await getToken({ template: 'supabase' });
	try {
		if (!supabaseToken) throw new Error('failed to get token');
		const supabase = supabaseClient(supabaseToken);
		const { data, error } = await supabase
			.from('Credit')
			.select('*')
			.eq('userId', userId)
			.single();
		if (error) throw error;
		return data;
	} catch (error) {
		console.error(error);
	}
	return null;
}

export default async function Page() {
	const credit: Credit | null = await getCredit();
	const user = await currentUser();
	return (
		<>
			<div className="flex w-full justify-center pt-4">
				<div className="flex w-4/5 flex-col px-12 pt-8">
					<SettingsHeader title={'profile.title'} />
					<div className="flex flex-col pt-8">
						<div className="flex w-full flex-row justify-between lg:w-1/2">
							<p className="text-lg text-neutral">Username</p>
							<p className="text-lg">
								{user?.firstName} {user?.lastName}
							</p>
						</div>
						<div className="flex w-full flex-row justify-between pt-4 lg:w-1/2">
							<p className="text-lg text-neutral">Email</p>
							<p className="text-lg">{user?.emailAddresses[0]?.emailAddress}</p>
						</div>
						<div className="flex flex-col pt-6">
							<div className="pb-4">
								<p className="text-lg text-neutral">Credits used</p>
							</div>
							<div className="flex flex-col lg:flex-row lg:items-center">
								<progress
									className=" progress progress-primary w-full lg:w-1/2"
									value={credit?.used ?? 0}
									max={credit?.credits ?? 100}
								></progress>
								<div className="pt-4 text-lg lg:pl-2 lg:pt-0">
									${credit?.used?.toFixed(2)} / ${credit?.credits?.toFixed(2)}{' '}
								</div>
							</div>
							<div className="flex w-full flex-row justify-between pt-2 lg:w-1/2 lg:pt-4">
								<p className="text-lg">Expired at</p>
								<p className="text-lg">
									{credit?.expireAt?.toString().slice(0, 10)}
								</p>
							</div>
							{/* <div onClick={fetchUsage} className="btn ">
                  fetch
                </div> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
