/* eslint-disable @typescript-eslint/no-explicit-any */
import SidebarItem from ".";

const SidebarItemMap = ({menuItems}: any) => {
	const {childMenu} = menuItems;

	return (
		<div className="space-y-2">
			{childMenu?.map(
				({
					href,
					label,
					icon,
					childMenu,
				}: {
					href: string;
					label: string;
					icon: string;
					childMenu: any;
				}) => (
					<SidebarItem
						href={href}
						key={label}
						label={label}
						icon={icon}
						childMenu={childMenu}
					/>
				)
			)}
		</div>
	);
};

export default SidebarItemMap;