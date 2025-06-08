import AppLayout from "@/components/organisms/Layout/AppLayout";
import {getAuthCredentials} from "@/utils/auth";
import {GetServerSideProps} from "next";

export default function Subscriptions() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl font-bold mb-4">Subscriptions</h1>
			<p className="text-gray-600">This page is under construction.</p>
		</div>
	);
}


Subscriptions.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const {permissions} = getAuthCredentials(ctx);
	return {
		props: {
			userPermissions: permissions,
		},
	};
};
