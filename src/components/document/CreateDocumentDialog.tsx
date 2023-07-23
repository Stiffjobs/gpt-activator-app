'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import DialogTransition from '../common/DialogTransition';
import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline';
import DragDropZone from './DragDropZone';
import ChooseFileButton from './ChooseFileButton';
import useDialogStore from 'stiff-gpt/store/dialogStore';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

type Section = {
	heading: string;
	content: string;
};

const CreateDocumentDialog: React.FC = () => {
	const t = useTranslations();
	const {
		mutateAsync: produceDocumentTopic,
		error,
		isLoading: produceLoading,
	} = useMutation({
		mutationFn: async ({ fileName }: { fileName: string }) => {
			const res = await fetch('/api/document/produce-document-topic', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ fileName }),
			});
			if (!res.ok) {
				throw new Error('Failed to produce document topic');
			}
			setDialogIsOpen(false);
		},
	});
	const { mutateAsync: createPresigned, isLoading: uploadLoading } =
		useMutation({
			mutationFn: async ({ fileName }: { fileName: string }) => {
				const res = await fetch('/api/document/create-presigned', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ fileName }),
				});
				if (!res.ok) {
					throw new Error('Failed to create presigned url');
				}
				const { url } = await res.json();

				return { fileName, url };
			},
			onSuccess: async res => {
				if (res === undefined) throw new Error('No presigned url');
				const { fileName, url: presignedUrl } = res;

				const response = await fetch(presignedUrl, {
					method: 'PUT',
					body: acceptedFiles[0],
				});

				if (response.ok) {
					await produceDocumentTopic({ fileName });
				}
			},
		});

	const onDrop = useCallback((acceptedFiles: File[]) => {
		const reader = new FileReader();
		const file = acceptedFiles[0];

		reader.onabort = () => console.log('file reading was aborted');
		reader.onerror = () => console.log('file reading has failed');
		reader.onload = ({ target }) => {
			if (target === null) return;
		};

		reader.readAsText(file!);
	}, []);

	const handlePresigned = async () => {
		try {
			if (acceptedFiles[0] === undefined) throw new Error('No file selected');
			const res = await Promise.resolve(
				createPresigned({ fileName: acceptedFiles[0].name })
			);
			if (res === undefined) throw new Error('No presigned url');
		} catch (error) {
			console.error(error);
		}
	};
	const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
		onDrop,
		accept: {
			'text/csv': ['.csv'],
		},
		maxFiles: 1,
	});
	const isOpen = useDialogStore(state => state.isOpen);
	const setDialogIsOpen = useDialogStore(state => state.setDialogIsOpen);
	return (
		<div>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={() => setDialogIsOpen(false)}
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<DialogTransition>
								<Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<div className=" relative flex flex-row ">
										{/* title */}
										<Dialog.Title
											as="h3"
											className="text-lg font-medium leading-6 text-gray-900"
										>
											{'document.dialog.title'}
										</Dialog.Title>
									</div>
									{/* body */}
									{acceptedFiles[0] === undefined ? (
										<div className=" mt-6 flex flex-col rounded border">
											<DragDropZone
												getInputProps={getInputProps}
												getRootProps={getRootProps}
											/>
										</div>
									) : (
										<div className="flex items-center justify-center">
											<div className="mt-6 flex w-full max-w-xs  items-center justify-between rounded-md border border-success bg-white px-4 py-2">
												{acceptedFiles[0]?.name}
												<CheckIcon className="h-5 w-5 text-success" />
											</div>
										</div>
									)}
									{/* end */}
									{acceptedFiles[0] === undefined ? (
										<ChooseFileButton
											getInputProps={getInputProps}
											getRootProps={getRootProps}
										/>
									) : (
										<div className="mt-6 flex flex-col items-center justify-center">
											<ChooseFileButton
												getInputProps={getInputProps}
												getRootProps={getRootProps}
											/>
											<button
												onClick={handlePresigned}
												className="w-48 btn-success btn text-neutral"
											>
												{uploadLoading || produceLoading ? (
													<span className="loading loading-spinner loading-sm"></span>
												) : null}
												upload
											</button>
										</div>
									)}
								</Dialog.Panel>
							</DialogTransition>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};
export default CreateDocumentDialog;
