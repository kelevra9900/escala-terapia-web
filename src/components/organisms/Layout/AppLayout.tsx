import dynamic from 'next/dynamic';
import {GetServerSideProps} from 'next';

import {ADMIN_ROLE,ALLOWED_ROLES} from '@/utils/constants';
import {getAuthCredentials,hasAccess,isAuthenticated} from '@/utils/auth';
import {Routes} from '@/settings/routes';

const AdminLayout = dynamic(() => import('./Admin'));
const TherapistLayout = dynamic(() => import('./Therapist'));

export default function AppLayout({
	userPermissions,
	...props
}: {
	userPermissions: string[];
}) {
	if (userPermissions?.includes(ADMIN_ROLE)) {
		return <AdminLayout {...props} />;
	}
	return <TherapistLayout {...props} />;
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const {token,permissions} = getAuthCredentials(ctx);
	if (
		!isAuthenticated({token,permissions}) ||
		!hasAccess(ALLOWED_ROLES,permissions)
	) {
		return {
			redirect: {
				destination: Routes.login,
				permanent: false,
			},
		};
	}
	return {
		props: {
			userPermissions: permissions,
		},
	};
};