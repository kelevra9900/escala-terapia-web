import {GetServerSideProps} from "next";
import AppLayout from "@/components/organisms/Layout/AppLayout";
import {getAuthCredentials} from "@/utils/auth";


export default function Reports() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl font-bold mb-4">Reports</h1>
			<p className="text-gray-600">This page is under construction.</p>
		</div>
	);
}


Reports.Layout = AppLayout;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const {permissions} = getAuthCredentials(ctx);
	return {
		props: {
			userPermissions: permissions,
		},
	};
};
