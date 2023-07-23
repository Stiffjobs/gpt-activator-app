import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import DialogTransition from '../common/DialogTransition';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Document } from 'stiff-gpt/app/[locale]/dashboard/document/page';
import parseDate from 'stiff-gpt/utils/parseDate';

interface Props {
	doc: Document | null;
	isOpen: boolean;
	closeModal: () => void;
}

const DocumentDetailsDialog: React.FC<Props> = ({
	isOpen,
	closeModal,
	doc,
}) => {
	if (!doc) return <></>;
	return (
		<div>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
					<div className="fixed inset-0 overflow-y-auto">
						<DialogTransition>
							<div className="flex min-h-full items-center justify-center p-4 text-center">
								<Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<div className="relative flex flex-row">
										{/* title */}
										<Dialog.Title
											as="h3"
											className="mx-6 w-full text-lg font-medium leading-6 text-gray-900"
										>
											<div className="flex w-full justify-between">
												<p>{'document.details.dialog.title'}</p>
												<PencilSquareIcon className="h-6 w-6" />
											</div>
										</Dialog.Title>
									</div>
									{/* body */}
									<div className="mx-6 my-8 flex flex-col">
										<ul>
											<li>
												<div className="flex justify-between">
													<p> ID: </p>
													<div>{doc?.id.toString()}</div>
												</div>
											</li>
											<li>
												<div className="flex  justify-between">
													<p>Document Name: </p>
													<div>{doc?.fileName}</div>
												</div>
											</li>
											<li>
												<div className="flex justify-between">
													<p> Updated At: </p>
													<div>
														{parseDate(
															doc.updatedAt?.toString() ??
																parseDate(doc.createdAt.toString())
														)}
													</div>
												</div>
											</li>
											<li>
												<div className="flex justify-between">
													<p>Integrations: </p>
													{doc.integrationId ? (
														<p>{doc.integrationId?.toString()}</p>
													) : (
														<Link
															className="underline"
															href="/settings/integration"
														>
															Go Create
														</Link>
													)}
												</div>
											</li>
										</ul>
									</div>
									{/* footer */}
									<div className="mx-6 mt-6 flex items-center justify-end">
										<button className="btn-s " onClick={closeModal}>
											{'document.details.dialog.cancel'}
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

export default DocumentDetailsDialog;
