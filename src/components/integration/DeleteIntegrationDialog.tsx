import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import DialogTransition from '../common/DialogTransition';
import useDialogStore from 'stiff-gpt/store/dialogStore';
import { Integration } from 'stiff-gpt/app/[locale]/dashboard/integration/page';

interface Props {
	integration: Integration | null;
}

const DeleteIntegrationDialog: React.FC<Props> = ({ integration }) => {
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
						<DialogTransition>
							<div className="flex min-h-full items-center justify-center p-4 text-center">
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<div className="relative flex flex-row">
										{/* title */}
										<Dialog.Title
											as="h3"
											className="ml-8 text-lg font-medium leading-6 text-gray-900"
										></Dialog.Title>
									</div>
									{/* body */}
									<div className="ml-8 mt-4 flex flex-col"></div>
									{/* footer */}
									<div className="ml-8 mt-6 flex items-center justify-end">
										<button
											className="btn-s mr-4"
											onClick={() => setDialogIsOpen(false)}
										>
											Cancel
										</button>
										<button
											disabled
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
export default DeleteIntegrationDialog;
