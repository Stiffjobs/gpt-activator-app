'use client';
import {
	ChartBarIcon,
	CreditCardIcon,
	DocumentDuplicateIcon,
	SquaresPlusIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { ReactNode } from 'react';
interface NavItem {
	name: string;
	href: string;
	icon: ReactNode;
}
const drawers: NavItem[] = [
	{
		name: 'dashboard.index',
		href: '/dashboard',
		icon: <UserIcon className="h-6 w-6 " />,
	},
	{
		name: 'dashboard.document',
		href: '/dashboard/document',
		icon: <DocumentDuplicateIcon className="h-6 w-6" />,
	},
	{
		name: 'dashboard.usage',
		href: '/dashboard/usage',
		icon: <ChartBarIcon className="h-6 w-6" />,
	},
	{
		name: 'dashboard.payment',
		href: '/dashboard/payment',
		icon: <CreditCardIcon className="h-6 w-6" />,
	},
	{
		name: 'dashboard.integration',
		href: '/dashboard/integration',
		icon: <SquaresPlusIcon className="h-6 w-6" />,
	},
];
export default function Page({ children }: { children: React.ReactNode }) {
	const t = useTranslations('Navigation');
	return (
		<div className="drawer lg:drawer-open h-screen border-t">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col ">{children}</div>
			<div className="drawer-side border-r py-2">
				<label htmlFor="my-drawer-2" className="drawer-overlay"></label>

				<ul className="menu w-80 p-4 text-base-content">
					{drawers.map(item => (
						<li key={item.name} className="py-2">
							<Link href={item.href} className="text-lg" key={item.name}>
								{item.icon}
								{t(item.name)}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
