import { create } from 'zustand';

interface DialogState {
	isOpen: boolean;
	integrationDetailIsOpen: boolean;
	setDialogIsOpen: (value: boolean) => void;
	setIntegrationDetailIsOpen: (value: boolean) => void;
}

const useDialogStore = create<DialogState>(set => ({
	isOpen: false,
	integrationDetailIsOpen: false,
	setDialogIsOpen: (value: boolean) => {
		set(_ => ({
			isOpen: value,
		}));
	},
	setIntegrationDetailIsOpen(value) {
		set(_ => ({
			integrationDetailIsOpen: value,
		}));
	},
}));

export default useDialogStore;
