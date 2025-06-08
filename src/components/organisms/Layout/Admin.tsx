import cn from 'classnames'

import {Footer,Header} from '@/components/organisms'
import {Scrollbar} from '@/components/molecules';
import SideBarGroup from '../Sidebar';

const AdminLayout: React.FC<{children?: React.ReactNode}> = ({children}) => {
	return (
		<div className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150">
			<Header />
			<div className="flex flex-1">
				<aside
					className={cn(
						'fixed lg:w-76 bottom-0 z-10 hidden h-full w-72 bg-white shadow transition-[width] duration-300 ltr:left-0 ltr:right-auto rtl:right-0 rtl:left-auto lg:block pt-20',
					)}
				>
					<div className="sidebar-scrollbar h-full w-full overflow-x-hidden">
						<Scrollbar
							className="h-full w-full"
							options={{
								scrollbars: {
									autoHide: 'never',
								},
							}}
						>
							<SideBarGroup />
						</Scrollbar>
					</div>
				</aside>
				<main
					className={cn(
						'relative flex w-full flex-col justify-start transition-[padding] duration-300 ltr:xl:pl-76 rtl:xl:pr-76 ltr:lg:pl-72 rtl:lg:pr-72 rtl:lg:pl-0',
					)}
				>
					<div className="h-full p-5 md:p-8">{children}</div>
					<Footer />
				</main>
			</div>
		</div>
	)

}

export default AdminLayout;
