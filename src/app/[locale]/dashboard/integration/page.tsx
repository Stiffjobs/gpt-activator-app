import SettingsHeader from 'stiff-gpt/components/SettingsHeader';
import CreateIntegrationDialog from 'stiff-gpt/components/integration/CreateIntegrationDialog';
import IntegrationList from 'stiff-gpt/components/integration/IntegrationList';
import { getDocumentList } from 'stiff-gpt/utils/api/getDocumentList';
import { getIntegrationList } from 'stiff-gpt/utils/api/getIntegrationList';

export type Integration = {
	callbackUrl: string | null;
	channelId: string | null;
	createdAt: string;
	details: string | null;
	documentId: number | null;
	id: number;
	key: string | null;
	name: string | null;
	origin: string | null;
	type: 'LINE' | 'JAVASCRIPT' | null;
	userId: string;
};

export default async function Page() {
	const integration = getIntegrationList();
	const document = getDocumentList();
	const [integrationList, documentList] = await Promise.all([
		integration,
		document,
	]);
	return (
		<div className="flex w-full justify-center pt-4">
			<div className="flex w-4/5 flex-col px-12 pt-8 lg:px-6">
				<SettingsHeader
					title={'integration.title'}
					hasButton
					buttonTitle={'integration.button.new' ?? ''}
					dialog={<CreateIntegrationDialog documentList={documentList} />}
				/>
				<div className="pt-8">
					{integrationList?.length === 0 ? (
						<p>Activate your GPT-Integration with Document</p>
					) : (
						<IntegrationList integrationList={integrationList} />
					)}
				</div>
			</div>
		</div>
	);
}
