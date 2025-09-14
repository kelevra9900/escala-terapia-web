import {useState,useEffect} from 'react';

import {Card,LinkButton,Loader,PageHeading,Seo} from '@/components/atoms';
import StatCard from '@/components/atoms/StatCard';
import {UsersIcon} from '@heroicons/react/24/outline';

import AppLayout from '@/components/organisms/Layout/AppLayout';
import Search from '@/components/molecules/Searchbar';

import {useModalAction} from '@/context/ModalContext';
import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';

import {getAuthCredentials} from '@/utils/auth';
import {PlusIcon} from '@heroicons/react/24/solid';
import {useGetClients} from '@/data/therapist';
import {Routes} from '@/settings/routes';
import ClientTable from '@/components/organisms/ClientTable';
import {Meta} from '@/types';


export default function TherapistClients() {
	const {openModal} = useModalAction();
	const router = useRouter();

	const [page,setPage] = useState(1);
	const [search,setSearch] = useState('');
	const [debouncedSearch,setDebouncedSearch] = useState(search);
	const {data,isLoading} = useGetClients({
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
		openModal('BAN_CUSTOMER',userId);
	}

	function handleSearch({searchText}: {searchText: string}) {
		setSearch(searchText);
		setPage(1);
	}

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<Loader className="h-10 w-10" />
			</div>
		);
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
					<PageHeading title={'Pacientes'} />
					</div>

					<div className="flex w-full flex-col items-center space-y-4 space-x-4 ms-auto md:w-3/4 md:flex-row md:space-y-0 xl:w-2/4">
						<Search
							onSearch={handleSearch}
							placeholderText={'Buscar paciente por nombre o email'}
							variant="outline"
							className="w-full"
						/>
						<LinkButton
							href={Routes.therapistClients.create}
							variant="outline"
							className="w-full md:w-auto"
						>
							<PlusIcon className="me-2 h-5 w-5" />
							<span>Crear</span>
						</LinkButton>
					</div>
				</Card>

				{/* Resumen */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
					<StatCard
						title="Total de pacientes"
						value={data?.meta?.totalCount ?? 0}
						variant="primary"
						icon={<UsersIcon className="w-6 h-6" />}
					/>
				</div>

					<ClientTable
						clients={data?.data || []}
						meta={data?.meta as Meta}
						onClientDelete={handleOpenUserDelete}
						onClientClick={(id) => {
							router.push(Routes.therapistClients.details(id))
						}}
						onAssignForm={(client) => {
							router.push(`${Routes.therapistForms.assign}?clientId=${encodeURIComponent(client.id)}&clientName=${encodeURIComponent(client.name)}&clientEmail=${encodeURIComponent(client.email)}`)
						}}
						onPagination={(page) => setPage(page)}
					/>
			</>
		</>
	);
};

TherapistClients.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const {permissions} = getAuthCredentials(ctx);
	return {
		props: {
			userPermissions: permissions,
		},
	};
};
