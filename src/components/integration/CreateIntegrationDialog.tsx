'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import useDialogStore from 'stiff-gpt/store/dialogStore';
import { Document } from 'stiff-gpt/app/[locale]/dashboard/document/page';
import superjson from 'superjson';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import LineIntegration from './LineIntegration';
import JavascriptIntegration from './JavascriptIntegration';

interface Props {
	documentList: Document[];
}

const CreateIntegrationDialog: React.FC<Props> = ({ documentList }) => {
	const [integrationType, setIntegrationType] = useState<string | null>();
	const [lineChannelId, setLineChannelId] = useState<string | null>();
	const [lineAccessToken, setLineAccessToken] = useState<string | null>();
	const [integrationName, setIntegrationName] = useState<string | null>();
	const [origin, setOrigin] = useState<string | null>();
	const [selectedDocument, setSelectedDocument] = useState<Document | null>();

	const { mutateAsync: createIntegration } = useMutation({
		mutationFn: async ({
			integrationType,
			lineChannelId,
			lineAccessToken,
			origin,
			integrationName,
			selectedDocument,
		}: {
			integrationType: string;
			lineChannelId: string | null;
			lineAccessToken: string | null;
			origin: string | null;
			integrationName: string;
			selectedDocument: Document;
		}) => {
			const res = await fetch('/api/integration/create-integration', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: integrationName,
					type: integrationType,
					origin: origin,
					channelId: lineChannelId,
					details: lineAccessToken,
					documentId: selectedDocument.id,
				}),
			});

			if (!res.ok) {
				throw new Error('Network response was not ok');
			}
		},
	});

	const isOpen = useDialogStore(state => state.isOpen);
	const setDialogIsOpen = useDialogStore(state => state.setDialogIsOpen);
	const handleSubmit = async () => {
		try {
			if (!integrationType || !integrationName || !selectedDocument) {
				throw new Error('Missing required fields');
			}
			await createIntegration({
				integrationType: integrationType,
				integrationName: integrationName,
				selectedDocument: selectedDocument,
				origin: origin ?? null,
				lineChannelId: lineChannelId ?? null,
				lineAccessToken: lineAccessToken ?? null,
			});
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				onClose={() => setDialogIsOpen(false)}
			>
				<div className="fixed inset-0 bg-black bg-opacity-25" />

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<div className=" relative flex flex-row ">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Create New Integration
									</Dialog.Title>
								</div>
								<div className="ml-8 mt-4 flex flex-col">
									<div className="inline-block w-80">
										<div className="form-control">
											<label className="label">Integration Type</label>
											<select
												onChange={e => {
													console.log('e', e.target.value);
													setIntegrationType(e.target.value);
												}}
												defaultValue={'What type of integration?'}
												className="select  w-full max-w-xs"
											>
												<option disabled>What type of integration?</option>
												<option value={'LINE'}>LINE</option>
												<option value={'JAVASCRIPT'}>JavaScript</option>
											</select>
										</div>
										<div className="form-control w-full max-w-xs">
											<label className="label">
												<span className="label-text">Integration Name</span>
											</label>
											<input
												onChange={e => setIntegrationName(e.target.value)}
												type="text"
												placeholder="Your Integration Name"
												className="input-bordered input w-full max-w-xs"
											/>
										</div>
										<div className="flex flex-col ">
											<div className="form-control">
												<label className="label">Integration Document</label>
												<select
													disabled={documentList?.length === 0}
													className="select-bordered select w-full max-w-xs"
													onChange={e =>
														setSelectedDocument(
															superjson.parse(e.target.value) as Document
														)
													}
													defaultValue={'Integrated with documents'}
												>
													<option disabled>Integrated with documents</option>
													{documentList?.map(doc => {
														return (
															<option
																value={superjson.stringify(doc)}
																key={doc.id.toString()}
															>
																{doc.fileName}
															</option>
														);
													})}
												</select>
											</div>
										</div>
										{integrationType === null ? null : integrationType ===
										  'LINE' ? (
											<LineIntegration
												setLineAccessToken={setLineAccessToken}
												setLineChannelId={setLineChannelId}
											/>
										) : (
											<JavascriptIntegration setOrigin={setOrigin} />
										)}
									</div>
								</div>

								<div className="mt-6 flex items-center justify-end ">
									<button
										className="btn-s mr-4"
										onClick={() => setDialogIsOpen(false)}
									>
										Cancel
									</button>
									<button
										onClick={handleSubmit}
										className="btn-success btn-sm btn"
									>
										Submit
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default CreateIntegrationDialog;
