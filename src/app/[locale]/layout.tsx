import { Open_Sans } from 'next/font/google';
import Navbar from 'stiff-gpt/components/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import Providers from 'stiff-gpt/utils/providers';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { notFound } from 'next/navigation';

export const metadata = {
	title: 'GPT-Activator',
	description: 'Generated by create next app',
};

const fonts = Open_Sans({
	subsets: ['latin'],
});
export default async function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	let messages;
	try {
		messages = (await import(`../../messages/${locale}.json`)).default;
	} catch (error) {
		notFound();
	}
	return (
		<html>
			<ClerkProvider>
				<Providers>
					<body className={fonts.className}>
						<NextIntlClientProvider locale={locale} messages={messages}>
							<main>
								<Navbar />
								{children}
							</main>
						</NextIntlClientProvider>
					</body>
				</Providers>
			</ClerkProvider>
		</html>
	);
}
