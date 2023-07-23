'use client';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { classNames, navigation } from './Navbar';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
	open: boolean;
}

const LargeNavbar: React.FC<Props> = ({ open }) => {
	const t = useTranslations('Navigation');

	return (
		<div className="relative flex h-16 items-center justify-between">
			<div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
				{/* Mobile menu button*/}
				<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
					<span className="sr-only">Open main menu</span>
					{open ? (
						<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
					) : (
						<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
					)}
				</Disclosure.Button>
			</div>
			<div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
				<div className="flex flex-shrink-0 items-center">
					{/* <img */}
					{/*   className="hidden h-8 w-auto lg:block" */}
					{/*   src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" */}
					{/*   alt="Your Company" */}
					{/* /> */}

					{/* title */}
					{/* {isSetting ? (
            <div className="hidden text-4xl font-bold lg:block">
              {t("nav.settings")}
            </div> */}
					{/* ) : ( */}
					<div className="text-2xl font-bold text-neutral">{t('title')}</div>
					{/* )} */}
				</div>
			</div>
			<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:ml-6 sm:pr-0 lg:static lg:inset-auto">
				{/* Profile dropdown */}
				<div className="hidden lg:ml-6 lg:mr-[100px] lg:block">
					<div className="flex space-x-4">
						{navigation.map(item => (
							<Link
								key={item.name}
								href={item.href}
								className={classNames(
									'rounded-md px-3 py-2 text-lg font-medium text-neutral'
								)}
							>
								{t(item.name)}
							</Link>
						))}
					</div>
				</div>
				<div className="hidden lg:flex">
					<SignedIn>
						<UserButton
							userProfileMode="navigation"
							userProfileUrl="/dashboard"
						/>
					</SignedIn>
					<SignedOut>
						<Link href="/sign-in">
							<button className="btn-primary btn-sm btn text-neutral">
								{t('sign_in')}
							</button>
						</Link>
						<div className="divider divider-horizontal" />
						<Link href="/sign-up">
							<button className="btn-primary btn-sm btn text-neutral">
								{t('sign_up')}
							</button>
						</Link>
					</SignedOut>
				</div>
			</div>
		</div>
	);
};

export default LargeNavbar;
