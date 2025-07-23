/* eslint-disable @typescript-eslint/no-explicit-any */
import {SidebarItemMap} from "@/components/molecules";
import {siteSettings} from "@/settings/site.settings";

type MenuItemsProps = Record<string,any>;

const SideBarGroup = () => {
	const menuItems: MenuItemsProps = siteSettings?.sidebarLinks?.admin.therapist;
	const menuKeys = Object.keys(menuItems);

	return (
		<>
			{menuKeys?.map((menu,index) => (
				<div
					className={'flex flex-col px-5 pt-6 pb-3'}
					key={index}
				>
					<div
						className={'px-3 pb-5 text-xs font-semibold uppercase tracking-[0.05em] text-body/60'}
					>
						{menuItems[menu]?.label}
					</div>
					<SidebarItemMap menuItems={menuItems[menu]} />
				</div>
			))}
		</>
	)
}

export default SideBarGroup