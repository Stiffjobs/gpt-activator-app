'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, Fragment, useState } from 'react';
import DialogTransition from '../common/DialogTransition';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Integration } from 'stiff-gpt/app/[locale]/dashboard/integration/page';
import useDialogStore from 'stiff-gpt/store/dialogStore';
import copyToClipboard from 'stiff-gpt/utils/copyToClipboard';

interface Props {
	setShowToast: Dispatch<React.SetStateAction<boolean>>;
	integration: Integration | null;
}
const IntegrationDetailsDialog: React.FC<Props> = ({
	integration,
	setShowToast,
}) => {
	const [deleteEnabled, setDeleteEnabled] = useState(false);
	const setIntegrationDetailIsOpen = useDialogStore(
		state => state.setIntegrationDetailIsOpen
	);
	const integrationDetailIsOpen = useDialogStore(
		state => state.integrationDetailIsOpen
	);
	const checkDeleteEnabled = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === 'DELETE') {
			setDeleteEnabled(true);
		} else {
			setDeleteEnabled(false);
		}
	};
	const showToastMessage = () => {
		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
		}, 3000);
	};
	const handleCopy = async () => {
		await copyToClipboard(integration?.callbackUrl ?? '');
		showToastMessage();
	};
	const handleClose = () => {
		setIntegrationDetailIsOpen(false);
		setDeleteEnabled(false);
	};
	return (
		<div>
			<Transition appear show={integrationDetailIsOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={handleClose}>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
					<div className="fixed inset-0 overflow-y-auto">
						<DialogTransition>
							<div className="flex min-h-full items-center justify-center p-4 text-center">
								<Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<div className="relative flex flex-row justify-between">
										{/* title */}
										<Dialog.Title
											as="h3"
											className="ml-8 text-lg font-medium leading-6 text-gray-900"
										>
											Integration: {integration?.name?.toString()}
										</Dialog.Title>
										<XMarkIcon className="h-6 w-6" onClick={handleClose} />
									</div>
									{/* body */}
									<div className="ml-8 mr-4 mt-8 flex flex-col">
										<div className="flex flex-row justify-between">
											<p>Itegrate with Document</p>
											<Link href="/settings/document">
												<span className="text-neutral underline">
													{integration?.documentId?.toString()}
												</span>
											</Link>
										</div>
										<div className="flex flex-row justify-between">
											<p>Integration Type</p>
											<p>{integration?.type}</p>
										</div>
										<div className="flex flex-row justify-between">
											<p>Channel ID</p>
											<p>{integration?.channelId}</p>
										</div>
										<div className="mt-8 flex flex-row justify-between">
											<p>Callback URL</p>
											<button
												onClick={handleCopy}
												className="btn-primary btn-sm btn"
											>
												copy callback url
											</button>
										</div>
									</div>
									{/* footer */}
									<div className="ml-8 mt-12 flex flex-row items-center justify-between">
										<input
											type="text"
											onChange={checkDeleteEnabled}
											placeholder="Type DELETE here"
											className="input-border input input-sm w-48 max-w-xs border-gray-500 bg-white "
										/>
										<button
											disabled={!deleteEnabled}
											className="btn-error btn-sm btn text-white"
										>
											Delete
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
export default IntegrationDetailsDialog;
