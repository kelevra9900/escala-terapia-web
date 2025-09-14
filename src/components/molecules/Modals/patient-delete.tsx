import {ConfirmationCard} from "@/components/atoms";
import {useModalAction,useModalState} from "@/context/ModalContext";
import {useDeletePatientMutation} from "@/data/therapist";

// create a modal to delete patient, add text and helper text
const DeletePatient = () => {
	const {closeModal} = useModalAction();
	const {data} = useModalState();
	const patientId = (typeof data === 'string' ? data : data?.id) as string | undefined;

	// Hook requires an id; pass empty string if missing but guard on usage
	const {mutate,isPending} = useDeletePatientMutation();

	const handleDelete = () => {
		closeModal();
		if (!patientId) return;
		mutate(patientId);
	};

	return (
		<ConfirmationCard
			onCancel={closeModal}
			onDelete={handleDelete}
			title="Eliminar paciente"
			description="¿Confirmas que deseas eliminar a este paciente? Esta acción eliminará sus datos asociados y no se puede deshacer."
			cancelBtnLoading={false}
			deleteBtnLoading={isPending}
			cancelBtnClassName="rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
			deleteBtnClassName="text-white hover:text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 focus:outline-none focus:ring-2 rounded-md"
		/>
	);
};

export default DeletePatient;
