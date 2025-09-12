import {GetServerSideProps} from "next";

import {Card,Loader,PageHeading,Seo} from "@/components/atoms";
import {FormTable} from "@/components/organisms";
import AppLayout from "@/components/organisms/Layout/AppLayout";
import {useGetForms} from "@/data/therapist";
import {getAuthCredentials,hasAccess} from "@/utils/auth";
import {ALLOWED_ROLES} from "@/utils/constants";
import {Routes} from "@/settings/routes";
import {useEffect,useState} from "react";
import {Meta} from "@/types";
import Search from "@/components/molecules/Searchbar";


export default function TherapistForms() {
	const [page,setPage] = useState(1);
	const [search,setSearch] = useState('');
	const [debouncedSearch,setDebouncedSearch] = useState(search);

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
					<PageHeading title={'Formularios terminados'} />
				</div>

				<div className="flex w-full flex-col items-center space-y-4 space-x-4 ms-auto md:w-3/4 md:flex-row md:space-y-0 xl:w-2/4">
					<Search
						onSearch={handleSearch}
						placeholderText={'Buscar usuario por nombre o email'}
						variant="outline"
						className="w-full"
					/>

				</div>
			</Card>

			<FormTable
				data={data?.data || []}
				meta={data?.meta as Meta}
				onResponseClick={(id) => {
					console.log('Response clicked:',id);
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
