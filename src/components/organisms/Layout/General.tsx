import {Footer,Header,MenuMobile} from '@/components/organisms'

const GeneralLayout: React.FC<{children?: React.ReactNode}> = ({
	children,
}) => {
	return (
		<div className="bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
			<Header />
			{children}
			<MenuMobile />
			<Footer />
		</div>
	);
}

export default GeneralLayout;