/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export type MODAL_VIEWS =
	| 'DELETE_COUPON'
	| 'BAN_CUSTOMER'
	| 'MAKE_ADMIN'
	| 'DELETE_TERMS_AND_CONDITIONS'
	| 'SEARCH_VIEW'
	| 'DESCRIPTION_VIEW'
	| 'DELETE_REFUND_POLICY'
	| 'COUPON_APPROVE_VIEW'
	| 'COUPON_DISAPPROVE_VIEW'
	| 'UPDATE_FORM_INVITATION'
	| 'DELETE_PATIENT'
	| 'DELETE_FLASH_SALE_REQUEST';

export type ModalDataMap = {
	DELETE_COUPON: {couponId: string};
	BAN_CUSTOMER: {userId: string};
	MAKE_ADMIN: {userId: string};
	DELETE_TERMS_AND_CONDITIONS: {termsId: string};
	SEARCH_VIEW: {query: string};
	DESCRIPTION_VIEW: {description: string};
	DELETE_REFUND_POLICY: {policyId: string};
	COUPON_APPROVE_VIEW: {couponId: string};
	COUPON_DISAPPROVE_VIEW: {couponId: string; reason: string};
	DELETE_FLASH_SALE_REQUEST: {saleId: string};
};

interface State {
	view?: MODAL_VIEWS;
	data?: any;
	isOpen: boolean;
}
type Action =
	| {type: 'open'; view?: MODAL_VIEWS; payload?: any}
	| {type: 'close'};

const initialState: State = {
	view: undefined,
	isOpen: false,
	data: null,
};

function modalReducer(state: State,action: Action): State {
	switch (action.type) {
		case 'open':
			return {
				...state,
				view: action.view,
				data: action.payload,
				isOpen: true,
			};
		case 'close':
			return {
				...state,
				view: undefined,
				data: null,
				isOpen: false,
			};
		default:
			throw new Error('Unknown Modal Action!');
	}
}

const ModalStateContext = React.createContext<State>(initialState);
ModalStateContext.displayName = 'ModalStateContext';
const ModalActionContext = React.createContext<
	React.Dispatch<Action> | undefined
>(undefined);
ModalActionContext.displayName = 'ModalActionContext';

export const ModalProvider: React.FC<{children?: React.ReactNode}> = ({
	children,
}) => {
	const [state,dispatch] = React.useReducer(modalReducer,initialState);
	return (
		<ModalStateContext.Provider value={state}>
			<ModalActionContext.Provider value={dispatch}>
				{children}
			</ModalActionContext.Provider>
		</ModalStateContext.Provider>
	);
};

export function useModalState() {
	const context = React.useContext(ModalStateContext);
	if (context === undefined) {
		throw new Error(`useModalState must be used within a ModalProvider`);
	}
	return context;
}

export function useModalAction() {
	const dispatch = React.useContext(ModalActionContext);
	if (dispatch === undefined) {
		throw new Error(`useModalAction must be used within a ModalProvider`);
	}
	return {
		openModal(view?: MODAL_VIEWS,payload?: unknown) {
			dispatch({type: 'open',view,payload});
		},
		closeModal() {
			dispatch({type: 'close'});
		},
	};
}
