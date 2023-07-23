'use client';
import { ChevronDownIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';
import parseDate from 'stiff-gpt/utils/parseDate';
import { Integration } from 'stiff-gpt/app/[locale]/dashboard/integration/page';
import useDialogStore from 'stiff-gpt/store/dialogStore';

interface Props {
	integration: Integration;
	setSelectedIntegration: Dispatch<SetStateAction<Integration | null>>;
	setDeleteOpen: Dispatch<SetStateAction<boolean>>;
}

const IntegrationListItem: React.FC<Props> = ({
	integration,
	setSelectedIntegration,
	setDeleteOpen,
}) => {
	const integrationDetailIsOpen = useDialogStore(
		state => state.integrationDetailIsOpen
	);
	const setIntegrationDetailIsOpen = useDialogStore(
		state => state.setIntegrationDetailIsOpen
	);
	const handleDelete = () => {
		setDeleteOpen(true);
		setSelectedIntegration(integration);
	};
	const handleShowDetails = () => {
		setIntegrationDetailIsOpen(true);
		setSelectedIntegration(integration);
		console.log('show details');
	};
	return (
		<tr className="border-b" onClick={handleShowDetails}>
			<td>{integration.id.toString()}</td>
			<td>{integration.type}</td>
			<td>{integration.documentId?.toString()}</td>
			<td>{parseDate(integration.createdAt?.toString())}</td>
			<td className="text-center">
				<ChevronDownIcon className="mx-auto h-6 w-6" />
			</td>
		</tr>
	);
};
export default IntegrationListItem;
