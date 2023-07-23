'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const desktopRobotSrc = '/images/robot.png';
const mobileRobotSrc = '/images/robot_mobile.png';

const Home: React.FC = () => {
	const t = useTranslations('Index');
	return (
		<div className="flex items-center justify-center bg-white py-8 md:py-24">
			<div className="hidden md:flex">
				<div
					className="flex h-[650px] w-[650px] flex-col items-start 
         justify-around rounded-bl-[40px] rounded-tl-[40px] bg-white px-12"
				>
					<div>
						<p className="text-[28px] font-bold lg:text-[30px]">
							{t('desktop.title')}
						</p>
						<p className="mt-6 text-[18px] lg:text-[20px]">
							{t('desktop.introductory')}
						</p>
					</div>
					<p>{t('desktop.calltoaction')}</p>
				</div>
				<div>
					<Image
						src={desktopRobotSrc}
						alt="landing-bg-desktop"
						width={650}
						height={650}
						className=" block aspect-square max-w-none overflow-hidden   object-cover"
						priority
					/>
				</div>
			</div>

			<div className="relative md:hidden">
				<Image
					src={mobileRobotSrc}
					width={350}
					height={600}
					className="relative h-full w-screen object-cover"
					alt="landing-bg-mobile"
				/>
				<div className="absolute left-1/3 top-[50px] ">
					<p className=" text-[24px] font-bold">{t('mobile.title')}</p>
					<p className=" z-10 text-[16px]">{t('mobile.introductory')}</p>
					<p className=" z-10 text-[14px]">{t('mobile.calltoaction')}</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
