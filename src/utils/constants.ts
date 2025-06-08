import {atom} from 'jotai';


export const AUTH_CRED = 'AUTH_CRED'
export const PERMISSIONS = 'permissions';
export const ADMIN_ROLE = 'ADMIN';
export const THERAPIST_ROLE = 'THERAPIST';
export const ALLOWED_ROLES = [ADMIN_ROLE,THERAPIST_ROLE];
export const ONLY_ADMIN_ROLE = [ADMIN_ROLE];
export const DEFAULT_LANGUAGE = 'es';
export const DEFAULT_CURRENCY = 'MXN';

export const avatarColors = [
	'#ffdd00',
	'#fbb034',
	'#ff4c4c',
	'#c1d82f',
	'#f48924',
	'#7ac143',
	'#30c39e',
	'#06BCAE',
	'#0695BC',
	'#037ef3',
	'#146eb4',
	'#8e43e7',
	'#ea1d5d',
	'#fc636b',
	'#ff6319',
	'#e01f3d',
	'#a0ac48',
	'#00d1b2',
	'#472f92',
	'#388ed1',
	'#a6192e',
	'#4a8594',
	'#7B9FAB',
	'#1393BD',
	'#5E13BD',
	'#E208A7',
]

export const ACCEPTED_FILE_TYPES = {
	'image/jpeg': [],
	'image/png': [],
	'application/pdf': [],
	'application/zip': [],
};
export const RESPONSIVE_WIDTH = 1024 as number;

export const searchModalInitialValues = atom(false);
export const miniSidebarInitialValue = atom(false);
export const approveModalInitialValues = atom(false);
