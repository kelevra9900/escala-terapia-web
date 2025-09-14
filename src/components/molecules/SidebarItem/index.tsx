import Link from "next/link";
import useWindowSize from "react-use/lib/useWindowSize";
import {useRouter} from "next/router";
import cn from 'classnames';

import * as sidebarIcons from '@/components/atoms/Icons/sidebar';

import {useUI} from "@/context/UIContext";
import {RESPONSIVE_WIDTH} from "@/utils/constants";
import {getIcon} from "@/utils/get-icon";
const SidebarItem = ({
	href,
	icon,
	label,
	miniSidebar,
}: {
	href: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon: any; // Adjust type as needed, e.g., string if icon names are strings
	label: string;
	childMenu: [];
	miniSidebar?: boolean;
}) => {
	const {closeSidebar} = useUI();
	const router = useRouter();
	const {width} = useWindowSize();

	const sanitizedPath = router?.asPath?.split('#')[0]?.split('?')[0];

	return (
		<Link
			href={href}
			className={cn(
				`group flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-gray-700 text-start focus:text-accent ${miniSidebar && width >= RESPONSIVE_WIDTH
					? 'hover:text-accent-hover ltr:pl-3 rtl:pr-3'
					: 'hover:bg-gray-100'
				}`,
				sanitizedPath === href
					? `font-medium !text-accent-hover ${!miniSidebar ? 'bg-brand-moss/10 hover:!bg-brand-moss/10' : ''
					}`
					: '',
			)}
			title={label}
			onClick={() => closeSidebar()}
		>
			{icon ? (
				<span
					className={cn(
						'transition',
						sanitizedPath === href
							? 'text-accent-hover'
							: 'text-gray-600 group-focus:text-accent hover:bg-gray-100',
						miniSidebar && width >= RESPONSIVE_WIDTH
							? 'group-hover:text-accent'
							: null,
					)}
				>
					{getIcon({
						iconList: sidebarIcons,
						iconName: icon,
						className: 'w-5 h-5',
					})}
				</span>
			) : null}
			<span
				className={cn(miniSidebar && width >= RESPONSIVE_WIDTH ? 'hidden' : '')}
			>
				{label}
			</span>
		</Link>
	);
};

export default SidebarItem;