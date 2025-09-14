import {GetServerSideProps} from "next";

import {Card,Loader,PageHeading,Seo,DefaultButton,Select} from "@/components/atoms";
import StatCard from '@/components/atoms/StatCard';
import {DocumentCheckIcon} from '@heroicons/react/24/outline';
import {FormTable} from "@/components/organisms";
import AppLayout from "@/components/organisms/Layout/AppLayout";
import {useGetForms} from "@/data/therapist";
import {getAuthCredentials,hasAccess} from "@/utils/auth";
import {ALLOWED_ROLES} from "@/utils/constants";
import {Routes} from "@/settings/routes";
import {useEffect,useState} from "react";
import {useRouter} from 'next/router';
import {Meta} from "@/types";
import Search from "@/components/molecules/Searchbar";


export default function TherapistForms() {
	const router = useRouter();
	const [page,setPage] = useState(1);
	const [search,setSearch] = useState('');
	const [debouncedSearch,setDebouncedSearch] = useState(search);
	const [levelFilter,setLevelFilter] = useState<any>(null);

	const {data,isLoading} = useGetForms({
		page,
		limit: 10,
		search: debouncedSearch,
	});

	console.log('Data fetched:',data);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedSearch(search);
			setPage(1);
		},500);

		return () => clearTimeout(timeout);
	},[search]);


	function handleSearch({searchText}: {searchText: string}) {
		setSearch(searchText);
		setPage(1);
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader />
			</div>
		);
	}


	console.log('Forms data:',data);

	// Mock para tabla cuando no hay datos del servidor
	const mockData = [
		{
			id: 'resp-1',
			filledAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
			clientName: 'Roger Torres',
			clientEmail: 'roger.torres@example.com',
			formTemplateTitle: 'GAD-7 – Ansiedad Generalizada',
			score: 8,
			level: 'MILD' as const,
		},
		{
			id: 'resp-2',
			filledAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
			clientName: 'Ana López',
			clientEmail: 'ana.lopez@example.com',
			formTemplateTitle: 'PHQ-9 – Depresión',
			score: 3,
			level: 'MINIMAL' as const,
		},
	];

	const displayData = (data?.data && data.data.length > 0 ? data.data : mockData);
	const displayMeta = (data?.meta ?? {
		totalCount: displayData.length,
		totalPages: 1,
		currentPage: 1,
		pageSize: displayData.length,
	});

	return (
		<>
			<Seo
				title="Panel de Administración – Escala Terapia"
				description="Administra usuarios, suscripciones y formularios clínicos desde un solo lugar."
				url="https://escala-terapia.com/dashboard"
				noIndex
			/>

			<Card className="mb-8 flex flex-col items-center md:flex-row bg-white dark:bg-dark-1000">
				<div className="mb-4 md:mb-0 md:w-1/4">
					<PageHeading title={'Formularios completados'} />
				</div>

				<div className="flex w-full flex-col items-center space-y-4 space-x-4 ms-auto md:w-3/4 md:flex-row md:space-y-0 xl:w-3/4">
					<Search
						onSearch={handleSearch}
						placeholderText={'Buscar por paciente o formulario'}
						variant="outline"
						className="w-full"
					/>

					<div className="w-full md:w-64">
						<Select
							label="Nivel"
							placeholder="Todos los niveles"
							options={[
								{value: '',label: 'Todos'},
								{value: 'MINIMAL',label: 'Minimal'},
								{value: 'MILD',label: 'Leve'},
								{value: 'MODERATE',label: 'Moderado'},
								{value: 'SEVERE',label: 'Severo'},
							]}
							value={levelFilter}
							onChange={(opt) => setLevelFilter(opt)}
						/>
					</div>

					<DefaultButton
						variant="outline"
						className="whitespace-nowrap"
						onClick={() => console.log('Export CSV')}
					>
						Exportar CSV
					</DefaultButton>
				</div>
			</Card>

			{/* Resumen */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				<StatCard
					title="Total de respuestas"
					value={data?.meta?.totalCount ?? 0}
					icon={<DocumentCheckIcon className="w-6 h-6" />}
					variant="primary"
				/>
			</div>

			<FormTable
				data={displayData.filter((r) =>
					levelFilter?.value ? r.level === levelFilter.value : true
				)}
				meta={displayMeta as Meta}
				onResponseClick={(id) => {
					router.push(Routes.therapistForms.responses(id));
				}}
				onResponseDelete={(id) => {
					console.log('Response deleted:',id);
				}}
				onPagination={(page) => setPage(page)}
			/>
		</>
	)
}


TherapistForms.Layout = AppLayout;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const {token,permissions} = getAuthCredentials(ctx);
	if (!token || !hasAccess(ALLOWED_ROLES,permissions)) {
		return {redirect: {destination: Routes.login,permanent: false}};
	}
	return {props: {userPermissions: permissions}};
};
