'use client';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { ReactNode, useState } from 'react';
import useDialogStore from 'stiff-gpt/store/dialogStore';

interface Props {
	hasButton?: boolean;
	buttonTitle?: string;
	title: string;
	dialog?: ReactNode;
	toggleDialog?: () => void;
}

const SettingsHeader: React.FC<Props> = ({
	hasButton = false,
	title,
	dialog,
	buttonTitle,
}) => {
	const dialogIsOpen = useDialogStore(state => state.isOpen);
	const setDialogIsOpen = useDialogStore(state => state.setDialogIsOpen);
	const t = useTranslations('Dashboard');
	return (
		<>
			<div
				className={`border-divider flex flex-row justify-between border-b ${
					hasButton ? 'pb-4' : 'pb-6'
				}`}
			>
				<div className="text-3xl font-medium">{t(title)}</div>
				{hasButton ? (
					<button
						onClick={() => setDialogIsOpen(!dialogIsOpen)}
						className="btn-primary btn text-neutral"
					>
						<PlusIcon className="mr-2 h-5 w-5 font-bold " />
						{t(buttonTitle)}
					</button>
				) : null}
			</div>
			{dialog}
		</>
	);
};
export default SettingsHeader;
