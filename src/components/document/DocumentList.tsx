'use client';
import DocumentListItem from './DocumentListItem';
import DeleteDocumentDialog from './DeleteDocumentDialog';
import { useState } from 'react';
import DocumentDetailsDialog from './DocumentDetailsDialog';
import { Document } from 'stiff-gpt/app/[locale]/dashboard/document/page';

interface Props {
	documentList: Document[] | undefined;
}

const DocumentList: React.FC<Props> = ({ documentList }) => {
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const [selectedDocument, setSelectedDocument] = useState<Document | null>(
		null
	);

	return (
		<>
			<table className="w-full">
				<thead>
					<tr>
						<th className="w-3/10 text-start">Name</th>
						<th className="w-4/10 text-start">Updated At</th>
						<th className="w-2/10 text-start">Status</th>
						<th className="w-1/10 text-start"></th>
					</tr>
				</thead>
				<tbody>
					{documentList?.map(document => (
						<DocumentListItem
							key={document.id.toString()}
							document={document}
							toggleDetails={setIsDetailsOpen}
							toggleDialog={setIsDeleteOpen}
							selectDocument={setSelectedDocument}
						/>
					))}
				</tbody>
			</table>
			<DocumentDetailsDialog
				doc={selectedDocument!}
				closeModal={() => setIsDetailsOpen(false)}
				isOpen={isDetailsOpen}
			/>
			<DeleteDocumentDialog
				doc={selectedDocument}
				isOpen={isDeleteOpen}
				closeModal={() => setIsDeleteOpen(false)}
			/>
		</>
	);
};

export default DocumentList;
