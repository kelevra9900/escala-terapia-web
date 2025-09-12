import {useState,useEffect} from 'react';

import {Card,LinkButton,PageHeading,Seo} from '@/components/atoms';

import AppLayout from '@/components/organisms/Layout/AppLayout';
import {UserTable} from '@/components/organisms';
import Search from '@/components/molecules/Searchbar';
import {Routes} from '@/settings/routes';

import {usePaginatedUsers} from '@/data/user';
import {useModalAction} from '@/context/ModalContext';
import {Meta} from '@/types';
import {GetServerSideProps} from 'next';
import {getAuthCredentials,hasAccess} from '@/utils/auth';
import Loader from '@/components/atoms/Loader';
import {PlusIcon} from '@heroicons/react/24/solid';
import {useRouter} from 'next/router';
import {ONLY_ADMIN_ROLE} from '@/utils/constants';

export default function AdminUsers() {
	const {openModal} = useModalAction();
	const router = useRouter();

	const [page,setPage] = useState(1);
	const [search,setSearch] = useState('');
	const [debouncedSearch,setDebouncedSearch] = useState(search);

	const {data,isLoading} = usePaginatedUsers({
		page,
		limit: 10,
		search: debouncedSearch,
	});


	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedSearch(search);
			setPage(1);
		},500);

		return () => clearTimeout(timeout);
	},[search]);

	const handleOpenUserDelete = (userId: string) => {
		console.log('Opening user delete modal for userId:',userId);
		openModal('BAN_CUSTOMER',userId);
	}
	const handleOpenUserEdit = (userId: string) => {
		router.push(Routes.adminUsers.edit(userId));
	};

	function handleSearch({searchText}: {searchText: string}) {
		setSearch(searchText);
		setPage(1);
	}

	return (
		<>
			<Seo
				title="Panel de Administración – Escala Terapia"
				description="Administra usuarios, suscripciones y formularios clínicos desde un solo lugar."
				url="https://escala-terapia.com/dashboard"
				noIndex
			/>
			<>
				<Card className="mb-8 flex flex-col items-center md:flex-row bg-white dark:bg-dark-1000">
					<div className="mb-4 md:mb-0 md:w-1/4">
						<PageHeading title={'Control de usuarios'} />
					</div>

					<div className="flex w-full flex-col items-center space-y-4 space-x-4 ms-auto md:w-3/4 md:flex-row md:space-y-0 xl:w-2/4">
						<Search
							onSearch={handleSearch}
							placeholderText={'Buscar usuario por nombre o email'}
							variant="outline"
							className="w-full"
						/>
						<LinkButton
							href={`${Routes.adminUsers.create}`}
							variant="outline"
							className="w-full md:w-auto"
						>
							<PlusIcon className="me-2 h-5 w-5" />
							<span>Crear</span>
						</LinkButton>

					</div>
				</Card>

				{isLoading ? <Loader /> : (
					<UserTable
						users={data?.data || []}
						meta={data?.meta || {} as Meta}
						isLoading={isLoading}
						onUserClick={(userId) => handleOpenUserEdit(userId)}
						onUserDelete={(userId) => handleOpenUserDelete(userId)}
						onPagination={(page) => setPage(page)}
					/>
				)}
			</>
		</>
	);
};

AdminUsers.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const {token,permissions} = getAuthCredentials(ctx);
	if (!token || !hasAccess(ONLY_ADMIN_ROLE,permissions)) {
		return {redirect: {destination: Routes.login,permanent: false}};
	}
	return {props: {userPermissions: permissions}};
};
