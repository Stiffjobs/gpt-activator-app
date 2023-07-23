import { auth } from '@clerk/nextjs';
import { Suspense } from 'react';
import SettingsHeader from 'stiff-gpt/components/SettingsHeader';
import CreateDocumentDialog from 'stiff-gpt/components/document/CreateDocumentDialog';
import DocumentList from 'stiff-gpt/components/document/DocumentList';
import { getDocumentList } from 'stiff-gpt/utils/api/getDocumentList';
import { supabaseClient } from 'stiff-gpt/utils/supabaseClient';
export type Document = {
	checksum: string | null;
	createdAt: string;
	fileName: string;
	id: number;
	integrationId: number | null;
	status: string | null;
	tokenCount: number;
	updatedAt: string | null;
	userId: string;
};

export default async function Page() {
	const data = await getDocumentList();
	return (
		<div className="flex w-full justify-center px-12 pt-4">
			<div className="flex w-4/5 flex-col pt-8">
				<SettingsHeader
					title={'document.title'}
					hasButton
					buttonTitle={'document.button.new' ?? ''}
					dialog={<CreateDocumentDialog />}
				/>
				{/* content under header */}
				<Suspense fallback={<div>Loading...</div>}>
					<DocumentList documentList={data} />
				</Suspense>
			</div>
		</div>
	);
}
