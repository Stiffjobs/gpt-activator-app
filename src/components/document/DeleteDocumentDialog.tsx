import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import DialogTransition from '../common/DialogTransition';
import { Document } from 'stiff-gpt/app/[locale]/dashboard/document/page';
import { useTranslations } from 'next-intl';

interface Props {
	isOpen: boolean;
	doc: Document | null;
	closeModal: () => void;
}

const DeleteDocumentDialog: React.FC<Props> = ({ isOpen, closeModal, doc }) => {
	const [deleteEnabled, setDeleteEnabled] = useState(false);
	const t = useTranslations('Dashboard.document.delete');

	const checkDeleteEnabled = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === doc?.fileName) {
			setDeleteEnabled(true);
		} else {
			setDeleteEnabled(false);
		}
	};

	const handleClose = () => {
		closeModal();
		setDeleteEnabled(false);
	};

	return (
		<div>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={handleClose}>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
					<div className="fixed inset-0 overflow-y-auto">
						<DialogTransition>
							<div className="flex min-h-full items-center justify-center p-4 text-center">
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<div className="relative flex flex-row">
										{/* title */}
										<Dialog.Title
											as="h3"
											className="ml-8 text-lg font-medium leading-6 text-gray-900"
										>
											{t('title')} {doc?.fileName}
										</Dialog.Title>
									</div>
									{/* body */}
									<div className="ml-8 mt-4 flex flex-col">
										<ul>
											<li key={1}>
												<p>{t('confirmation')}</p>
											</li>
											<li key={2}>
												<p>{t('details')}</p>
											</li>
										</ul>
										<input
											type="text"
											onChange={checkDeleteEnabled}
											placeholder={doc?.fileName}
											className="input-border input input-sm mt-6 w-4/5 max-w-xs border-gray-500 bg-white "
										/>
									</div>
									{/* footer */}
									<div className="ml-8 mt-6 flex items-center justify-end">
										<button className="btn-s mr-4" onClick={handleClose}>
											{t('cancel')}
										</button>
										<button
											disabled={!deleteEnabled}
											className="btn-error btn-sm btn text-white"
										>
											{t('delete')}
										</button>
									</div>
								</Dialog.Panel>
							</div>
						</DialogTransition>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default DeleteDocumentDialog;
