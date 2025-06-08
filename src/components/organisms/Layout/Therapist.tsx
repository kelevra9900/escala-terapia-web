import Footer from "../Footer";
import Header from "../Header";


const TherapistLayout: React.FC<{children?: React.ReactNode}> = ({
	children,
}) => {
	return (
		<div className="flex flex-col min-h-screen transition-colors duration-150 bg-gray-100">
			<Header />
			<div className="flex flex-1">
				<aside className='fixed bottom-0 z-10 hidden h-full w-72 bg-white shadow transition-[width] duration-300 ltr:left-0 ltr:right-auto rtl:right-0 rtl:left-auto lg:block pt-20'>
					<div className="w-full h-full overflow-x-hidden sidebar-scrollbar">

					</div>
				</aside>

				<main className='relative flex w-full flex-col justify-start transition-[padding] duration-300 pt-[72px] lg:pt-20 ltr:xl:pl-76 rtl:xl:pr-76 ltr:lg:pl-72 rtl:lg:pr-72 rtl:lg:pl-0'>
					<div className="h-full p-5 md:p-8">{children}</div>
					<Footer />
				</main>
			</div>
		</div>
	)
}


export default TherapistLayout;