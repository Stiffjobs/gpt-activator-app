'use client';
import { useState } from 'react';
import IntegrationListItem from './IntegrationListItem';
import IntegrationDetailsDialog from './IntegrationDetailsDialog';
import { Integration } from 'stiff-gpt/app/[locale]/dashboard/integration/page';

interface Props {
	integrationList: Integration[] | undefined;
}
const IntegrationList: React.FC<Props> = ({ integrationList }) => {
	const [showToast, setShowToast] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [selectedIntegration, setSelectedIntegration] =
		useState<Integration | null>(null);
	return (
		<>
			<table className="w-full">
				<thead>
					<tr>
						<th className="w-1/10 text-start">ID</th>
						<th className="w-1/10 text-start">TYPE</th>
						<th className="w-1/5 text-start">DOCUMENT</th>
						<th className="w-1/5 text-start">CREATED AT</th>
					</tr>
				</thead>
				<tbody>
					{integrationList?.map(integration => {
						return (
							<IntegrationListItem
								key={integration.id.toString()}
								integration={integration}
								setDeleteOpen={setIsDeleteOpen}
								setSelectedIntegration={setSelectedIntegration}
							/>
						);
					})}
				</tbody>
			</table>
			{showToast && (
				<div className="toast-end toast">
					<div className="alert alert-success">
						<span>Callback URL copied to clipboard</span>
					</div>
				</div>
			)}
			<IntegrationDetailsDialog
				setShowToast={setShowToast}
				integration={selectedIntegration}
			/>
		</>
	);
};

export default IntegrationList;
