/* eslint-disable @typescript-eslint/no-explicit-any */
import React,{FC,useMemo} from 'react';

export interface State {
	displaySidebar: boolean;
	displayCartSidebar: boolean;
	displayModal: boolean;
	modalData: any;
	modalView: string;
}

const initialState = {
	displaySidebar: false,
	displayCartSidebar: false,
	displayModal: false,
	modalView: 'LOGIN_VIEW',
	modalData: null,
};

type Action =
	| {
		type: 'OPEN_SIDEBAR';
	}
	| {
		type: 'CLOSE_SIDEBAR';
	}
	| {
		type: 'OPEN_CART_SIDEBAR';
	}
	| {
		type: 'CLOSE_CART_SIDEBAR';
	}
	| {
		type: 'OPEN_MODAL';
	}
	| {
		type: 'CLOSE_MODAL';
	}
	| {
		type: 'SET_MODAL_VIEW';
		view: MODAL_VIEWS;
	}
	| {
		type: 'SET_MODAL_DATA';
		data: MODAL_DATA;
	};

type MODAL_VIEWS =
	| 'SIGNUP_VIEW'
	| 'LOGIN_VIEW'
	| 'FORGOT_VIEW'
	| 'DELETE_PRODUCT';

type MODAL_DATA = any;

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State,action: Action) {
	switch (action.type) {
		case 'OPEN_SIDEBAR': {
			return {
				...state,
				displaySidebar: true,
			};
		}
		case 'CLOSE_SIDEBAR': {
			return {
				...state,
				displaySidebar: false,
			};
		}
		case 'OPEN_CART_SIDEBAR': {
			return {
				...state,
				displayCartSidebar: true,
			};
		}
		case 'CLOSE_CART_SIDEBAR': {
			return {
				...state,
				displayCartSidebar: false,
			};
		}
		case 'OPEN_MODAL': {
			return {
				...state,
				displayModal: true,
			};
		}
		case 'CLOSE_MODAL': {
			return {
				...state,
				displayModal: false,
			};
		}
		case 'SET_MODAL_VIEW': {
			return {
				...state,
				modalView: action.view,
			};
		}
		case 'SET_MODAL_DATA': {
			return {
				...state,
				modalData: action.data,
			};
		}
	}
}

export const UIProvider: FC<{children?: React.ReactNode}> = (props) => {
	const [state,dispatch] = React.useReducer(uiReducer,initialState);

	const openSidebar = () => dispatch({type: 'OPEN_SIDEBAR'});
	const closeSidebar = () => dispatch({type: 'CLOSE_SIDEBAR'});
	const toggleSidebar = () =>
		state.displaySidebar
			? dispatch({type: 'CLOSE_SIDEBAR'})
			: dispatch({type: 'OPEN_SIDEBAR'});
	const openCartSidebar = () => dispatch({type: 'OPEN_CART_SIDEBAR'});
	const closeCartSidebar = () => dispatch({type: 'CLOSE_CART_SIDEBAR'});
	const toggleCartSidebar = () =>
		state.displayCartSidebar
			? dispatch({type: 'CLOSE_CART_SIDEBAR'})
			: dispatch({type: 'OPEN_CART_SIDEBAR'});
	const closeSidebarIfPresent = () =>
		state.displaySidebar && dispatch({type: 'CLOSE_SIDEBAR'});

	const openModal = () => dispatch({type: 'OPEN_MODAL'});
	const closeModal = () => dispatch({type: 'CLOSE_MODAL'});

	const setModalView = (view: MODAL_VIEWS) =>
		dispatch({type: 'SET_MODAL_VIEW',view});
	const setModalData = (data: MODAL_DATA) =>
		dispatch({type: 'SET_MODAL_DATA',data});

	const value = useMemo(
		() => ({
			...state,
			openSidebar,
			closeSidebar,
			toggleSidebar,
			openCartSidebar,
			closeCartSidebar,
			toggleCartSidebar,
			closeSidebarIfPresent,
			openModal,
			closeModal,
			setModalView,
			setModalData,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state]
	);

	return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
	const context = React.useContext(UIContext);
	if (context === undefined) {
		throw new Error(`useUI must be used within a UIProvider`);
	}
	return context;
};
