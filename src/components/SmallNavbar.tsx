import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import { classNames, mobileNavigation, navigation } from './Navbar';
import { SignedIn, SignedOut, useAuth, useClerk } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

const SmallNavbar = () => {
	const t = useTranslations('Navigation');
	const { signOut } = useClerk();
	return (
		<Disclosure.Panel className="lg:hidden">
			{/* Mobile navbar */}
			<div className="space-y-1 px-2 pb-3 pt-2">
				<SignedIn>
					{mobileNavigation.map(item => (
						<Link
							key={item.name}
							href={item.href}
							className={classNames(
								'block rounded-md px-3 py-2 text-base font-medium'
							)}
						>
							{t(item.name)}
						</Link>
					))}
				</SignedIn>
				<SignedOut>
					<Link
						className="block rounded-md px-3 py-2 text-base font-medium"
						href="/sign-in"
					>
						<button>{'nav.signin'}</button>
					</Link>
					<Link
						className="block rounded-md px-3 py-2 text-base font-medium"
						href="/sign-up"
					>
						<button>{'nav.signup'}</button>
					</Link>
				</SignedOut>
				{navigation.map(item => (
					<Link
						key={item.name}
						href={item.href}
						className={classNames(
							'block rounded-md px-3 py-2 text-base font-medium'
						)}
					>
						{t(item.name)}
					</Link>
				))}
				{/* only show when signedIn */}
				<SignedIn>
					<Link
						href="#"
						className="block rounded-md px-3 py-2 text-base font-medium"
					>
						<button onClick={() => signOut()}>Sign Out</button>
					</Link>
				</SignedIn>
			</div>
		</Disclosure.Panel>
	);
};
export default SmallNavbar;
