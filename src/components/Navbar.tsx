'use client';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import LargeNavbar from './LargeNavbar';
import SmallNavbar from './SmallNavbar';

export interface NavigationType {
	name: string;
	href: string;
}

export const navigation: NavigationType[] = [
	{ name: 'home', href: '/' },
	{ name: 'docs', href: '/docs' },
];

export const mobileNavigation: NavigationType[] = [
	{ name: 'dashboard.index', href: '/dashboard' },
	{
		name: 'dashboard.document',
		href: '/dashboard/document',
	},
	{ name: 'dashboard.usage', href: '/dashboard/usage' },
	{
		name: 'dashboard.payment',
		href: '/dashboard/payment',
	},
	{
		name: 'dashboard.integration',
		href: '/dashboard/integration',
	},
];

export function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
	return (
		<Disclosure
			as="nav"
			className="border-divider max-w-none"
			// className={`border-divider max-w-none ${isSetting ? 'border-b' : ''}`}
		>
			{({ open }) => (
				<>
					<div
						className="mx-auto bg-white px-2 sm:px-6 lg:px-8"
						// className={`mx-auto  px-2 sm:px-6 lg:px-8 ${
						//   isSetting ? "bg-white" : "bg-secondary"
						// }`}
					>
						<LargeNavbar open={open} />
						<SmallNavbar />
					</div>
				</>
			)}
		</Disclosure>
	);
}
