/* eslint-disable @typescript-eslint/no-unused-vars */
import {useRef,useEffect,useState} from "react";

import {Logo} from "@/components/atoms";
import {useAuth} from "@/context/AuthContext";

import NotifyDropdown from "../NotifyDropdown";
import {AvatarDropdown,LangDropdown} from "@/components/molecules";
import MenuBar from "../Menu";

import {useThemeMode} from '@/hooks/useThemeMode';
import {useGetMeInfo} from "@/data/user";
import Link from "next/link";

interface HeaderProps {
	className?: string;
}

const Header = ({className}: HeaderProps) => {
	const anchorRef = useRef<HTMLDivElement>(null)
	const {data: meInfo} = useGetMeInfo()
	// useThemeMode()

	return (
		<>
			<div className={`nc-header-bg sticky top-0 w-full left-0 right-0 z-40 ${className}`}>
				<div className={`relative z-10`}>
					<div className="container mx-auto flex h-20 items-center justify-between px-4">
						<div className="hidden flex-1 justify-start gap-x-3 sm:gap-x-8 md:flex lg:gap-x-10">
							<Logo className="self-center" />
							<div className="hidden h-7 self-center border-s border-neutral-300 dark:border-neutral-600 lg:block"></div>
						</div>

						<div className="hidden flex-1 flex-shrink-0 justify-end text-neutral-700 dark:text-neutral-100 md:flex lg:flex-none">
							{meInfo && (
								<>
									<div className="hidden gap-x-1 lg:flex">
										<LangDropdown />
										<NotifyDropdown />
										<AvatarDropdown role={meInfo.role} />
									</div>
									<div className="flex gap-x-2 lg:hidden">
										<NotifyDropdown />
										<AvatarDropdown role={meInfo.role} />
										<MenuBar />
									</div>
								</>
							)}

							{
								!meInfo && (
									<div className="flex items-center gap-x-2">
										<Link
											href="/login"
											className="font-(family-name:--font-inter) flex h-9 items-center justify-center rounded-lg bg-primary-600 px-4 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-offset-neutral-900"
										>
											Iniciar sesión
										</Link>
										<a
											href="/signup"
											className="font-(family-name:--font-inter) flex h-9 items-center justify-center rounded-lg bg-neutral-200 px-4 text-sm font-medium text-neutral-800 hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:ring-offset-neutral-900"
										>
											Registrarse
										</a>

									</div>
								)}
						</div>
					</div>
				</div>
			</div>
			<div ref={anchorRef} className="invisible absolute h-1"></div>
		</>
	);
}

export default Header;