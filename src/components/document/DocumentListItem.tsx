import {
	ArrowPathIcon,
	CheckCircleIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';
import { Document } from 'stiff-gpt/app/[locale]/dashboard/document/page';
import parseDate from 'stiff-gpt/utils/parseDate';

interface Props {
	document: Document;
	toggleDetails: Dispatch<SetStateAction<boolean>>;
	toggleDialog: Dispatch<SetStateAction<boolean>>;
	selectDocument: Dispatch<SetStateAction<Document | null>>;
}
const DocumentListItem: React.FC<Props> = ({
	document,
	toggleDialog,
	toggleDetails,
	selectDocument,
}) => {
	const handleStatus = (status: string | null) => {
		switch (status) {
			case 'PENDING':
				return <ArrowPathIcon className="h-6 w-6" />;

			case 'ACTIVE':
				return <CheckCircleIcon className="h-6 w-6 text-success" />;
			default:
				return null;
		}
	};

	const handleClick = () => {
		toggleDialog(true);
		selectDocument(document);
	};
	const handleDetails = () => {
		toggleDetails(true);
		selectDocument(document);
	};

	return (
		<tr className="border-b">
			<td className="w-3/10">
				<button onClick={handleDetails}>{document.fileName}</button>
			</td>
			<td className="w-4/10">
				{parseDate(
					document.updatedAt?.toString() ?? document.createdAt.toString()
				)}
			</td>
			<td className="w-2/10 flex flex-row">
				{handleStatus(document.status)}
				{document.status}
			</td>
			<td className="w-1/10">
				<button onClick={handleClick}>
					<TrashIcon className="h-6 w-6" />
				</button>
			</td>
		</tr>
	);
};

export default DocumentListItem;
