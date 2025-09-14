import dynamic from 'next/dynamic';

import {MODAL_VIEWS,useModalAction,useModalState} from "@/context/ModalContext";
import Modal from ".";


const UserDelete = dynamic(() => import('@/components/molecules/Modals/user-delete'));
const FormInvitationUpdate = dynamic(() => import('@/components/molecules/Modals/update-form-invitation'))
const DeletePatient = dynamic(() => import('@/components/molecules/Modals/patient-delete'));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderModal(view: MODAL_VIEWS | undefined,data?: any) {
	switch (view) {
		case 'BAN_CUSTOMER':
			return <UserDelete userId={data} />;
		case 'UPDATE_FORM_INVITATION':
			return <FormInvitationUpdate data={data} />
		case 'DELETE_PATIENT':
			return <DeletePatient />
		default:
			return null;
	}
}

const ManagedModal = () => {
	const {isOpen,view,data} = useModalState();
	const {closeModal} = useModalAction();
	return (
		<Modal open={isOpen} onClose={closeModal}>
			{renderModal(view,data)}
		</Modal>
	)
}

export default ManagedModal;