import AppLayout from "@/components/organisms/Layout/AppLayout";
import {getAuthCredentials,hasAccess} from "@/utils/auth";
import {GetServerSideProps} from "next";
import {Routes} from "@/settings/routes";
import {ONLY_ADMIN_ROLE} from "@/utils/constants";

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
	const {token,permissions} = getAuthCredentials(ctx);
	if (!token || !hasAccess(ONLY_ADMIN_ROLE,permissions)) {
		return {redirect: {destination: Routes.login,permanent: false}};
	}
	return {props: {userPermissions: permissions}};
};
